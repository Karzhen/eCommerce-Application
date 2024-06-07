import { describe, test } from "vitest";
import assert from 'assert';
import validateName from "../src/utils/validateName";

describe("validateName Tests", () => {
  test("Should return error for missing value", () => {
    const input = { value: "", validity: { valueMissing: true } } as unknown as HTMLInputElement;
    const errorMessage = validateName(input);
    assert.ok(errorMessage.includes("Required field"));
  });

  test("Should return error for invalid characters", () => {
    const input = { value: "John123", validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateName(input);
    assert.ok(errorMessage.includes("One or more characters from the English alphabet (no special characters or numbers)"));
  });

  test("Should return empty string for valid name", () => {
    const input = { value: "John", validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateName(input);
    assert.equal(errorMessage, '');
  });
});
