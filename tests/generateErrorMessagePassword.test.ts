import { describe, test } from "vitest";
import assert from 'assert';
import {generateErrorMessagePassword} from "../src/utils/validateEmailAndPassword";

describe("generateErrorMessagePassword Tests", () => {
  test("Should return error for missing value", () => {
    const input = { value: "", validity: { valueMissing: true } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Required field"));
  });

  test("Should return error for too short password", () => {
    const input = { value: "short", validity: { tooShort: true }, getAttribute: () => '8' } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Minimum input length: 8 characters"));
  });

  test("Should return error for missing uppercase letter", () => {
    const input = { value: "password1", validity: { patternMismatch: true } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Password must contain at least one uppercase letter"));
  });

  test("Should return error for missing lowercase letter", () => {
    const input = { value: "PASSWORD1", validity: { patternMismatch: true } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Password must contain at least one lowercase letter"));
  });

  test("Should return error for missing digit", () => {
    const input = { value: "Password", validity: { patternMismatch: true } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Password must contain at least one digit"));
  });

  test("Should return error for leading or trailing whitespace", () => {
    const input = { value: " Password1 ", validity: { patternMismatch: true } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.ok(errorMessage.includes("Password must not contain leading or trailing whitespace"));
  });

  test("Should return empty string for valid password", () => {
    const input = { value: "Password1", validity: { patternMismatch: false, valueMissing: false, tooShort: false } } as unknown as HTMLInputElement;
    const errorMessage = generateErrorMessagePassword(input);
    assert.equal(errorMessage, '');
  });
});
