import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Typeorm } from '../DB/typeorm/index.js';
import { Repository } from 'typeorm';
import { Product } from '../../Domain/Entity/product.js';
import { v4 as uuidv4 } from 'uuid';
import { ProductRepository } from './produc-typeorm.repository.js';
import { ProductEntity } from '../DB/typeorm/entities/product.entity.js';
import { OrderItemEntity } from '../DB/typeorm/entities/order-item.entity.js';
import { OrderEntity } from '../DB/typeorm/entities/order.entity.js';
import { CustomerEntity } from '../DB/typeorm/entities/customer.entity.js';

let repository: Repository<ProductEntity>;

describe('Product repository test', () => {
  beforeEach(async () => {
    await Typeorm.connect();

    await Typeorm.getInstance().getRepository(OrderItemEntity).clear();
    await Typeorm.getInstance().getRepository(OrderEntity).clear();
    await Typeorm.getInstance().getRepository(ProductEntity).clear();
    await Typeorm.getInstance().getRepository(CustomerEntity).clear();

    repository = Typeorm.getInstance().getRepository(ProductEntity);
  }); //iniciar conexão com banco de dados

  afterEach(async () => {}); // fechar conexão com banco de dados

  it('should save a product', async () => {
    expect(true).toBe(true);
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuidv4(), 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await repository.findOne({
      where: {
        id: product._id,
      },
    });

    expect(productModel).toMatchObject({
      id: product._id,
      name: product.name,
      price: product.price,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuidv4(), 'Product Pirate', 100);

    await productRepository.create(product);

    const productModel = await repository.findOne({
      where: {
        id: product._id,
      },
    });

    expect(productModel).toMatchObject({
      id: product._id,
      name: product.name,
      price: product.price,
    });

    product.changeName('Product Original');
    product.changePrice(1000);

    await productRepository.update(product);

    const productUpdated = await repository.findOne({
      where: {
        id: product._id,
      },
    });

    expect(productUpdated?.name).toBe(product.name);
    expect(productUpdated?.price).toBe(product.price);
  });
  it('should find a product by id', async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuidv4(), 'Product 1', 100);

    await productRepository.create(product);

    const findedProduct = await productRepository.findById(product._id);

    expect(findedProduct).toStrictEqual(product);
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();

    const product1 = new Product(uuidv4(), 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product(uuidv4(), 'Product 2', 300);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toEqual([product1, product2]);
  });
});
