import { RepositoryInterface } from '../../@shared/repository/repository-interface.js';
import { Customer } from '../entity/customer.js';

interface CustomerRepository extends RepositoryInterface<Customer> {}

export { CustomerRepository };
