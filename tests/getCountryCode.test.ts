import { describe, test } from 'vitest';
import assert from 'assert';
import { getCountryCode } from '../src/api/apiRegister';

describe('getCountryCode Tests', () => {
  test('Should return DE for Germany', () => {
    assert.equal(getCountryCode('Germany'), 'DE');
  });

  test('Should return US for United States', () => {
    assert.equal(getCountryCode('United States'), 'US');
  });

  test('Should return RU for Russia', () => {
    assert.equal(getCountryCode('Russia'), 'RU');
  });

  test('Should throw error for unknown country', () => {
    assert.throws(() => getCountryCode('Unknown Country'), /Country code not found for Unknown Country/);
  });
});
