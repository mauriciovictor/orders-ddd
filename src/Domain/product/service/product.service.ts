import { Product } from '../entiity/product.js';

class ProductService {
  static increasePrices(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice(product.price * (percentage / 100) + product.price);
    });
  }
}

export { ProductService };
