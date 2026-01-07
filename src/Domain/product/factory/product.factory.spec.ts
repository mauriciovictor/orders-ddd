import { describe, expect, it } from 'vitest';
import { ProductFactory } from './product.factory.js';

describe('Product Factory Unit Test', () => {
  it('shloud create a product type A', () => {
    const product = ProductFactory.create('a', 'Product 1', 100);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe('Product');
  });

  it('shloud create a product type B', () => {
    const product = ProductFactory.create('b', 'Product B', 100);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(200);
    expect(product.constructor.name).toBe('ProductB');
  });

  it('shloud thow error when create a product type c', () => {
    expect(() => ProductFactory.create('c', 'Product C', 100)).toThrowError(
      'Product type not found'
    );
  });
});
