import { describe, test } from "vitest";
import assert from 'assert'; 
import add from "../src/utils/example/addNumbers"

describe("Tests Examples", () => {
  test("Should add two positive numbers correctly", () => {
    assert.equal(add(1, 2), 3);
  });

  test("Should add two negative numbers correctly", () => {
    assert.equal(add(-1, -2), -3);
  });

  test("Should add a positive and a negative number correctly", () => {
    assert.equal(add(1, -2), -1);
  });

  test("Should add zero correctly", () => {
    assert.equal(add(0, 0), 0);
  });
});
