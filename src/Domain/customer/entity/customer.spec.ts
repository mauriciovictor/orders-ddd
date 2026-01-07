import { describe, expect, it } from 'vitest';
import { Customer } from './customer.js';
import { Address } from '../ValueObject/Address.js';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John');
    }).toThrowError('Customer id cannot be empty');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Customer name cannot be empty');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'Mauricio');
    customer.changeName('Jane');
    expect(customer.name).toBe('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '123', '12345', 'City 1');
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivte customer', () => {
    const customer = new Customer('123', 'Customer 1');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined', () => {
    expect(() => new Customer('123', 'Customer 1').activate()).toThrowError(
      'Address cannot be empty'
    );
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
