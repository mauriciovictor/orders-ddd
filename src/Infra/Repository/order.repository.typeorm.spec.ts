import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { Typeorm } from '../DB/typeorm/index.js';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../DB/typeorm/entities/order.entity.js';
import { CustomerRepository } from './customer-typeorm.repository.js';
import { Customer } from '../../Domain/Entity/customer.js';
import { Address } from '../../Domain/ValueObject/Address.js';
import { ProductRepository } from './produc-typeorm.repository.js';
import { Product } from '../../Domain/Entity/product.js';
import { OrderItem } from '../../Domain/Entity/order_item.js';
import { Order } from '../../Domain/Entity/order.js';
import { OrderRepository } from './order.typeorm.repository.js';
import { CustomerEntity } from '../DB/typeorm/entities/customer.entity.js';
import { OrderItemEntity } from '../DB/typeorm/entities/order-item.entity.js';
import { ProductEntity } from '../DB/typeorm/entities/product.entity.js';

let repository: Repository<OrderEntity>;

describe('Order repository test', () => {
  const createNewOrder = async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuidv4(), 'Customer 1');
    const address = new Address('13 de setembro', '100', '68904-809', 'Macapá');
    customer.setAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product(uuidv4(), 'Product 1', 100);
    const product2 = new Product(uuidv4(), 'Product 2', 150);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(uuidv4(), product1.id, 'Product 1', 100, 2);
    const orderItem2 = new OrderItem(uuidv4(), product2.id, 'Product 2', 100, 2);

    const orderRepository = new OrderRepository();
    const order = new Order(uuidv4(), customer.id, [orderItem1, orderItem2]);
    await orderRepository.create(order);

    return { order, customer, orderItem1, orderItem2 };
  };
  beforeAll(async () => {
    await Typeorm.connect();
  });

  beforeEach(async () => {
    await Typeorm.getInstance().getRepository(OrderItemEntity).clear();
    await Typeorm.getInstance().getRepository(OrderEntity).clear();
    await Typeorm.getInstance().getRepository(ProductEntity).clear();
    await Typeorm.getInstance().getRepository(CustomerEntity).clear();
    repository = Typeorm.getInstance().getRepository(OrderEntity);
  }); //iniciar conexão com banco de dados

  afterEach(async () => {}); // fechar conexão com banco de dados

  it('shoud a update an order', async () => {
    const { order } = await createNewOrder();

    const orderRepository = new OrderRepository();
    const productRepoositoory = new ProductRepository();
    const product = new Product(uuidv4(), 'Product 3', 100);
    await productRepoositoory.create(product);

    const newOrderItem = new OrderItem(uuidv4(), product.id, product.name, product.price, 1);
    order.addItem(newOrderItem);

    await orderRepository.update(order);

    const orderUpdated = await repository.findOne({
      where: {
        id: order.id,
      },
      relations: ['items'],
    });

    expect(orderUpdated?.items).toHaveLength(3);
  });

  it('should find all orders', async () => {
    const { order } = await createNewOrder();

    const orderRepository = new OrderRepository();
    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(1);

    const orderFound = orders[0];

    expect(orderFound.id).toBe(order.id);
    expect(orderFound.customer_id).toBe(order.customer_id);
    expect(orderFound.total()).toBe(order.total());

    expect(orderFound.items).toHaveLength(2);
  });

  it('should find an order by id', async () => {
    const { order } = await createNewOrder();
    const orderRepository = new OrderRepository();
    const orderFinded = await orderRepository.findById(order.id);

    expect(orderFinded).toMatchObject({
      id: order.id,
      customer_id: order.customer_id,
      items: order.items,
    });
  });

  it('should create a new order', async () => {
    const { order, customer, orderItem1, orderItem2 } = await createNewOrder();

    const orderModel = await repository.findOne({
      where: {
        id: order.id,
      },
      relations: ['items'],
    });

    expect(orderModel).toMatchObject({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem1._id,
          name: orderItem1._name,
          price: orderItem1._price,
          quantity: orderItem1._quantity,
          order_id: order.id,
        },
        {
          id: orderItem2._id,
          name: orderItem2._name,
          price: orderItem2._price,
          quantity: orderItem2._quantity,
          order_id: order.id,
        },
      ],
    });
  });
});
