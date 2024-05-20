import { describe, test } from "vitest";
import assert from 'assert';
import validateDateOfBirth from "../src/utils/validateDateOfBirth";

describe("validateDateOfBirth Tests", () => {
  test("Should return error for missing value", () => {
    const input = { value: "", validity: { valueMissing: true } } as unknown as HTMLInputElement;
    const errorMessage = validateDateOfBirth(input);
    assert.ok(errorMessage.includes("Required field"));
  });

  test("Should return error for invalid date format", () => {
    const input = { value: "invalid-date", validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateDateOfBirth(input);
    assert.ok(errorMessage.includes("Invalid date of birth or age below 18"));
  });

  test("Should return error for age below 18", () => {
    const currentDate = new Date();
    const inputDate = new Date(
      currentDate.getFullYear() - 10,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const input = { value: inputDate.toISOString().split('T')[0], validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateDateOfBirth(input);
    assert.ok(errorMessage.includes("Invalid date of birth or age below 18"));
  });

  test("Should return empty string for valid date of birth", () => {
    const currentDate = new Date();
    const inputDate = new Date(
      currentDate.getFullYear() - 25,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const input = { value: inputDate.toISOString().split('T')[0], validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateDateOfBirth(input);
    assert.equal(errorMessage, '');
  });
});
