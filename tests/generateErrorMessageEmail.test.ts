import { describe, test } from "vitest";
import assert from 'assert';
import {generateErrorMessageEmail} from "../src/utils/validateEmailAndPassword";


describe("generateErrorMessageEmail Tests", () => {
  test("Should return error for missing domain name", () => {
    const input = { value: "user@", validity: { patternMismatch: true } } as HTMLInputElement;
    const errorMessage = generateErrorMessageEmail(input);
    assert.ok(errorMessage.includes("Email address must contain a domain name"));
  });

  test("Should return error for improperly formatted email", () => {
    const input = { value: "user@domain", validity: { patternMismatch: true } } as HTMLInputElement;
    const errorMessage = generateErrorMessageEmail(input);
    assert.ok(errorMessage.includes("Email address must be properly formatted"));
  });

  test("Should return error for missing @ symbol", () => {
    const input = { value: "userdomain.com", validity: { patternMismatch: true } } as HTMLInputElement;
    const errorMessage = generateErrorMessageEmail(input);
    assert.ok(errorMessage.includes("Email address must contain an @ symbol"));
  });

  test("Should return error for leading or trailing whitespace", () => {
    const input = { value: " user@domain.com ", validity: { patternMismatch: true } } as HTMLInputElement;
    const errorMessage = generateErrorMessageEmail(input);
    assert.ok(errorMessage.includes("Email address must not contain leading or trailing whitespace"));
  });

  test("Should return empty string for valid email", () => {
    const input = { value: "user@domain.com", validity: { patternMismatch: false } } as HTMLInputElement;
    const errorMessage = generateErrorMessageEmail(input);
    assert.equal(errorMessage, '');
  });
});
