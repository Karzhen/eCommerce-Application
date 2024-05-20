import { describe, test } from "vitest";
import assert from 'assert';
import validatePostalCode from "../src/utils/validatePostalCode";

describe("validatePostalCode Tests", () => {
  test("Should return error for missing value", () => {
    const input = { value: "", validity: { valueMissing: true } } as unknown as HTMLInputElement;
    const errorMessage = validatePostalCode(input);
    assert.ok(errorMessage.includes("Required field"));
  });

  test("Should return error for pattern mismatch", () => {
    const input = { value: "12345", validity: { patternMismatch: true } } as unknown as HTMLInputElement;
    const errorMessage = validatePostalCode(input);
    assert.ok(errorMessage.includes("Must follow the format for the country"));
  });

  test("Should return empty string for valid postal code", () => {
    const input = { value: "12345", validity: { valueMissing: false, patternMismatch: false } } as unknown as HTMLInputElement;
    const errorMessage = validatePostalCode(input);
    assert.equal(errorMessage, '');
  });
});
