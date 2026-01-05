import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Typeorm } from '../DB/typeorm/index.js';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CustomerEntity } from '../DB/typeorm/entities/customer.entity.js';
import { CustomerRepository } from './customer-typeorm.repository.js';
import { Customer } from '../../Domain/Entity/customer.js';
import { Address } from '../../Domain/ValueObject/Address.js';
import { OrderItemEntity } from '../DB/typeorm/entities/order-item.entity.js';
import { OrderEntity } from '../DB/typeorm/entities/order.entity.js';
import { ProductEntity } from '../DB/typeorm/entities/product.entity.js';

let repository: Repository<CustomerEntity>;

describe('Customer repository test', () => {
  beforeEach(async () => {
    await Typeorm.connect();
    await Typeorm.getInstance().getRepository(OrderItemEntity).clear();
    await Typeorm.getInstance().getRepository(OrderEntity).clear();
    await Typeorm.getInstance().getRepository(ProductEntity).clear();
    await Typeorm.getInstance().getRepository(CustomerEntity).clear();

    repository = Typeorm.getInstance().getRepository(CustomerEntity);
  }); //iniciar conexão com banco de dados

  afterEach(async () => {}); // fechar conexão com banco de dados

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuidv4(), 'Customer 1');
    const address = new Address('13 de setembro', '123', '12345-678', 'São Paulo');
    customer.setAddress(address);

    await customerRepository.create(customer);

    const customerModel = await repository.findOne({
      where: {
        id: customer.id,
      },
    });

    expect(customerModel).toMatchObject({
      id: customer.id,
      name: customer.name,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuidv4(), 'Customer Pirate');
    const address = new Address('13 de setembro', '100', '68094-809', 'Macapá');
    customer.setAddress(address);

    await customerRepository.create(customer);

    const customerEntiity = await repository.findOne({
      where: {
        id: customer.id,
      },
    });

    expect(customerEntiity).toMatchObject({
      id: customer.id,
      name: customer.name,
    });

    customer.changeName('Customer Original');

    await customerRepository.update(customer);

    const customerUpdated = await repository.findOne({
      where: {
        id: customer.id,
      },
    });

    expect(customerUpdated?.name).toBe(customer.name);
  });
  it('should find a product by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuidv4(), 'Customer 1');
    const address = new Address('13 de setembro', '100', '68094-809', 'Macapá');
    customer.setAddress(address);

    await customerRepository.create(customer);

    const findedProduct = await customerRepository.findById(customer.id);

    expect(findedProduct).toStrictEqual(customer);
  });

  it('should throw an error when customer is not found', async () => {
    expect(async () => {
      const customerRepository = new CustomerRepository();
      await customerRepository.findById('121212');
    }).rejects.toThrowError('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('13 de setembro', '100', '68094-809', 'Macapá');

    const customer1 = new Customer(uuidv4(), 'Customer 1');
    const customer2 = new Customer(uuidv4(), 'Customer 2');

    customer1.setAddress(address);
    customer2.setAddress(address);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const costumers = await customerRepository.findAll();

    expect(costumers).toEqual([customer1, customer2]);
  });
});
