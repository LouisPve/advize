import { isEmptyObject, pick } from "../object";

describe("isEmptyObject", () => {
  test("isEmptyObject return true when object has 0 property", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  test("isEmptyObject return false when object has 1 property", () => {
    expect(isEmptyObject({ key: "value" })).toBe(false);
  });
  test("isEmptyObject return false when object has 1 null property", () => {
    expect(isEmptyObject({ key: null })).toBe(false);
  });
});

describe("pick", () => {
  test("pick return object with selected fields", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    const result = pick(obj, "key1", "key2");
    expect(result).toEqual({ key1: "value1", key2: "value2" });
  });

  test("pick return object with selected fields even if null", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: null,
    };

    const result = pick(obj, "key1", "key3");
    expect(result).toEqual({ key1: "value1", key3: null });
  });

  test("pick should work on empty object", () => {
    const obj = {};

    const result = pick(obj);
    expect(result).toEqual({});
  });

  test("pick should include fields with non-empty objects", () => {
    const obj = {
      key1: { nestedKey: "nestedValue" },
      key2: "value2",
      key3: {},
    };

    const result = pick(obj, "key1", "key3");
    expect(result).toEqual({ key1: { nestedKey: "nestedValue" } });
  });
});
