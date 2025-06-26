import { BadRequestError } from "../../errors/BadRequestError";
import { FundType } from "../funds/types";
import {
  Deposit,
  DepositType,
  PortfolioDeposit,
  ProductDeposit,
} from "./types";
import { NotFoundError } from "../../errors/NotFoundError";

import { Product } from "../products/types";

import * as productsRepositories from "../../repositories/productsRepositories";
import * as portfoliosRepositories from "../../repositories/portfoliosRepositories";
import * as depositsRepositories from "../../repositories/depositsRepositories";

function getDeposits(): Deposit[] {
  return depositsRepositories.getAllDeposits();
}

function getDepositById(depositId: number): Deposit | undefined {
  const deposit = depositsRepositories.getDepositById(depositId);
  if (!deposit) {
    throw new NotFoundError(`Deposit with id ${depositId} not found`);
  }
  return deposit;
}

function postDeposit(deposit: PortfolioDeposit | ProductDeposit): Deposit {
  if (deposit.type === "portfolio") {
    return _handlePortfolioDeposit(deposit);
  } else if (deposit.type === "product") {
    return _handleProductDeposit(deposit);
  }
  // If deposit type is not recognized, throw an error
  // This should never happen if types are used correctly
  throw new Error("Invalid deposit type");
}

function _handlePortfolioDeposit(deposit: PortfolioDeposit): Deposit {
  const portfolio = portfoliosRepositories
    .getAllPortfolios()
    .find((p) => p.id === deposit.portfolioId);

  if (!portfolio) {
    throw new NotFoundError(
      `Portfolio with id ${deposit.portfolioId} not found`,
    );
  }

  const newDeposit = {
    portfolioId: deposit.portfolioId,
    amount: deposit.amount,
    date: Date.now(),
    type: DepositType.PORTFOLIO,
  } as Deposit;
  return depositsRepositories.createDeposit(newDeposit);
}

function validateProductAllocation(
  product: Product,
  allocation: { type: FundType; amount: number }[],
) {
  const currentAlloc = getProductCurrentRepartition(product.id);
  const totalAllocAmount = allocation.reduce(
    (sum, alloc) => sum + alloc.amount,
    0,
  );

  // Vérification min/max par type
  for (const [type, config] of Object.entries(product.configuration)) {
    const alloc = allocation.find((a) => a.type === (type as FundType))?.amount;
    const currentTypeAllocation =
      currentAlloc.allocations.get(type as FundType) || 0;
    const percent =
      ((currentTypeAllocation + (alloc || 0)) /
        (currentAlloc.total + totalAllocAmount)) *
      100;

    if (percent < config.min) {
      throw new BadRequestError(
        `Le type ${type} doit être alloué à au moins ${config.min}%.`,
      );
    }
    if (percent > config.max) {
      throw new BadRequestError(
        `Le type ${type} ne doit pas dépasser ${config.max}%.`,
      );
    }
  }
}

function getProductCurrentRepartition(productId: number): {
  total: number;
  allocations: Map<FundType, number>;
} {
  // Filter all deposits for the given product
  const productDeposits = depositsRepositories
    .getAllDeposits()
    .filter(
      (deposit) =>
        deposit.type === DepositType.PRODUCT && deposit.productId === productId,
    );

  // Aggregate allocations by FundType
  const allocationMap = new Map<FundType, number>();

  for (const deposit of productDeposits) {
    if (deposit.allocation) {
      for (const alloc of deposit.allocation) {
        const type = alloc.type;
        allocationMap.set(type, (allocationMap.get(type) || 0) + alloc.amount);
      }
    }
  }

  const total = Array.from(allocationMap.values()).reduce(
    (sum, val) => sum + val,
    0,
  );

  // Return repartition if total > 0, else empty array
  if (total === 0) return { total, allocations: new Map() };

  return {
    total,
    allocations: allocationMap,
  };
}

function _handleProductDeposit(deposit: ProductDeposit): Deposit {
  if (!deposit.allocation || deposit.allocation.length === 0) {
    throw new BadRequestError("Product deposit must have an allocation");
  }

  const product = productsRepositories
    .getAllProducts()
    .find((p) => p.id === deposit.productId);
  if (!product) {
    throw new NotFoundError(`Product with id ${deposit.productId} not found`);
  }

  // Vérification de la conformité de l'allocation
  validateProductAllocation(
    product,
    deposit.allocation.map((a) => ({
      type: a.type as FundType,
      amount: a.amount,
    })),
  );

  const newDeposit = {
    productId: deposit.productId,
    amount: deposit.allocation.reduce((sum, alloc) => sum + alloc.amount, 0),
    allocation: deposit.allocation.map((alloc) => ({
      type: alloc.type as FundType,
      amount: alloc.amount,
    })),
    date: Date.now(),
    type: DepositType.PRODUCT,
  } as Deposit;

  return depositsRepositories.createDeposit(newDeposit);
}

export { getDeposits, getDepositById, postDeposit };
