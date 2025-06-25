import { BadRequestError } from "../../errors/BadRequestError";
import { FundType } from "../funds/types";
import {
  Deposit,
  DepositType,
  PortfolioDeposit,
  ProductDeposit,
} from "./types";
import { NotFoundError } from "../../errors/NotFoundError";
import productsData from "../../data/produits.json";
import portfoliosData from "../../data/portefeuilles.json";
import { Product } from "../products/types";
import { Portfolio } from "../portfolios/types";

const deposits: Deposit[] = [];
const typedProductsData = productsData as Product[];
const typedPortfoliosData = portfoliosData as Portfolio[];

function getDeposits(): Deposit[] {
  return deposits;
}

function getDepositById(depositId: number): Deposit | undefined {
  return deposits.find((deposit) => deposit.id === depositId);
}

function postDeposit(deposit: PortfolioDeposit | ProductDeposit): Deposit {
  if (deposit.type === "portfolio") {
    return _handlePortfolioDeposit(deposit);
  } else if (deposit.type === "product") {
    return _handleProductDeposit(deposit);
  }
  throw new Error("Invalid deposit type");
}

function _handlePortfolioDeposit(deposit: PortfolioDeposit): Deposit {
  const portfolio = typedPortfoliosData.find(
    (p) => p.id === deposit.portfolioId,
  );

  if (!portfolio) {
    throw new NotFoundError(
      `Portfolio with id ${deposit.portfolioId} not found`,
    );
  }

  const newDeposit: Deposit = {
    id: deposits.length + 1,
    portfolioId: deposit.portfolioId,
    amount: deposit.amount,
    date: Date.now(),
    type: DepositType.PORTFOLIO,
  };
  deposits.push(newDeposit);
  return newDeposit;
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
  const productDeposits = deposits.filter(
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

  // Compute total amount for normalization
  const total = Array.from(allocationMap.values()).reduce(
    (sum, val) => sum + val,
    0,
  );

  // Return repartition as percentage if total > 0, else empty array
  if (total === 0) return { total, allocations: new Map() };

  return {
    total,
    allocations: allocationMap,
    //percentage: Math.round((amount / total) * 100), // Add percentage field
  };
}

function _handleProductDeposit(deposit: ProductDeposit): Deposit {
  if (!deposit.allocation || deposit.allocation.length === 0) {
    throw new BadRequestError("Product deposit must have an allocation");
  }

  const product = typedProductsData.find((p) => p.id === deposit.productId);
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

  const newDeposit: Deposit = {
    id: deposits.length + 1,
    productId: deposit.productId,
    amount: deposit.allocation.reduce((sum, alloc) => sum + alloc.amount, 0),
    allocation: deposit.allocation.map((alloc) => ({
      type: alloc.type as FundType,
      amount: alloc.amount,
    })),
    date: Date.now(),
    type: DepositType.PRODUCT,
  };
  deposits.push(newDeposit);
  return newDeposit;
}

export { getDeposits, getDepositById, postDeposit };
