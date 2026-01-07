import { describe, expect, it } from 'vitest';
import { CustomerFactory } from './customer.factory.js';
import { Address } from '../ValueObject/Address.js';

describe('Customer Factory Unit Test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street 1', '123', '12345', 'City 1');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeDefined();
    expect(customer.address.street).toBe('Street 1');
    expect(customer.address.number).toBe(123);
    expect(customer.address.zip).toBe('12345');
    expect(customer.address.city).toBe('City 1');
  });
});
