import { RepositoryInterface } from './repository-interface';
import { Customer } from '../Entity/customer.js';

interface CustomerRepository extends RepositoryInterface<Customer> {}

export { CustomerRepository };
