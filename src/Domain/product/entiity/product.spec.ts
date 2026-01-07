import { describe, expect, it } from 'vitest';
import { Product } from './product.js';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrowError('Product id cannot be empty');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrowError('Product name cannot be empty');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product 1', -1);
    }).toThrowError('Product price must be greater than zero');
  });

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  });
});
