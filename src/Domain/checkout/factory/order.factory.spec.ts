import { describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { OrderFactory } from './order.factory.js';
describe('OrderFactory Unit Tests', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuidv4(),
      customer_id: uuidv4(),
      items: [
        {
          id: uuidv4(),
          name: 'Product 1',
          product_id: uuidv4(),
          price: 100,
          quantity: 1,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toEqual(orderProps.id);
    expect(order.customer_id).toEqual(orderProps.customer_id);
    expect(order.items.length).toBe(1);
    expect(order.items[0].id).toEqual(orderProps.items[0].id);
    expect(order.items[0].name).toEqual(orderProps.items[0].name);
    expect(order.items[0].product_id).toEqual(orderProps.items[0].product_id);
    expect(order.items[0].price).toEqual(orderProps.items[0].price);
    expect(order.items[0].quantity).toEqual(orderProps.items[0].quantity);
  });
});
