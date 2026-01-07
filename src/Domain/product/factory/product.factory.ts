import { Product } from '../entiity/product.js';
import ProductInterface from '../entiity/product.interface.js';
import { v4 as uuidv4 } from 'uuid';
import { ProductB } from '../entiity/productB.js';

class ProductFactory {
  static create(type: string, name: string, pricec: number): ProductInterface {
    switch (type) {
      case 'a':
        return new Product(uuidv4(), name, pricec);
      case 'b':
        return new ProductB(uuidv4(), name, pricec);
      default:
        throw new Error('Product type not found');
    }
  }
}

export { ProductFactory };
