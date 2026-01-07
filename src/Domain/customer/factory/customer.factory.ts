import { Customer } from '../entity/customer.js';
import { v4 as uuidv4 } from 'uuid';
import { Address } from '../ValueObject/Address.js';

class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuidv4(), name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuidv4(), name);
    customer.setAddress(address);
    return customer;
  }
}

export { CustomerFactory };
