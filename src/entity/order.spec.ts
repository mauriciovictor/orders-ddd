import { describe, expect, it } from 'vitest';
import { Order } from './order';
import { OrderItem } from './order_item';

describe('Order unit tests', () => {
  it('should throw erro when id is empty', () => {
    expect(() => {
      new Order('', '123', []);
    }).toThrowError('Order id cannot be empty');
  });

  it('should throw erro when customer id is empty', () => {
    expect(() => {
      new Order('123', '', []);
    }).toThrowError('Customer id cannot be empty');
  });

  it('should throw erro when items is empty', () => {
    expect(() => {
      new Order('123', '12', []);
    }).toThrowError('Order items cannot be empty');
  });

  it('should calculate total', () => {
    const orderItem1 = new OrderItem('1', '123', 'item 1', 100, 2);
    const order = new Order('123', '12', [orderItem1]);

    expect(order.total()).toBe(200);
  });

  it('should calculate totals', () => {
    const orderItem1 = new OrderItem('1', '123', 'item 1', 100, 2);
    const orderItem2 = new OrderItem('2', '1234', 'item 2', 150, 2);
    const order = new Order('123', '12', [orderItem2, orderItem1]);

    expect(order.total()).toBe(500);
  });

  it('should throw error if the item qtd is less or equal 0', () => {
    expect(() => {
      const orderItem1 = new OrderItem('1', '123', 'item 1', 100, 0);
      new Order('123', '12', [orderItem1]);
    }).toThrowError('Order items quantity must be greater than zero');
  });
});
