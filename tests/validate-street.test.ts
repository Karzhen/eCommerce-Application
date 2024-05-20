import { describe, test } from "vitest";
import assert from 'assert';
import validateStreet from "../src/utils/validateStreet";

describe("validateStreet Tests", () => {
  test("Should return error for missing value", () => {
    const input = { value: "", validity: { valueMissing: true } } as unknown as HTMLInputElement;
    const errorMessage = validateStreet(input);
    assert.ok(errorMessage.includes("Required field"));
  });

  test("Should return error for missing English alphabet character", () => {
    const input = { value: "12345", validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateStreet(input);
    assert.ok(errorMessage.includes("Must contain at least one English alphabet character"));
  });

  test("Should return empty string for valid street", () => {
    const input = { value: "Main Street", validity: { valueMissing: false } } as unknown as HTMLInputElement;
    const errorMessage = validateStreet(input);
    assert.equal(errorMessage, '');
  });
});
