import { describe, expect, it } from 'vitest';
import { Product } from '../Entity/product';
import { ProductService } from './product.service';

describe('Product Service unit tests', () => {
  it('should chane the prices of all products', () => {
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 150);

    ProductService.increasePrices([product1, product2], 100);

    expect(product1.price).toEqual(200);
    expect(product2.price).toEqual(300);
  });
});
