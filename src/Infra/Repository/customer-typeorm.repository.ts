import { RepositoryInterface } from '../../Domain/Repositoory/repository-interface.js';
import { Repository } from 'typeorm';
import { Typeorm } from '../DB/typeorm/index.js';
import { Customer } from '../../Domain/Entity/customer.js';
import { CustomerEntity } from '../DB/typeorm/entities/customer.entity.js';
import { Address } from '../../Domain/ValueObject/Address.js';

class CustomerRepository implements RepositoryInterface<Customer> {
  private get repository(): Repository<CustomerEntity> {
    return Typeorm.manager().getRepository(CustomerEntity);
  }

  async update(entity: Customer): Promise<void> {
    await this.repository.update(entity.id, {
      name: entity.name,
      street: entity.address.street,
      zipcode: entity.address.zip,
      number: entity.address.number,
      city: entity.address.city,
      active: entity.isActive(),

      rewardPoints: entity.rewardPoints,
    });
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customerModel = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!customerModel) throw new Error('Customer not found');

    return customerModel ? this.toEntity(customerModel) : undefined;
  }

  toEntity(customerEntity: CustomerEntity): Customer {
    const customer = new Customer(customerEntity.id, customerEntity.name);
    const address = new Address(
      customerEntity.street,
      customerEntity.number.toString(),
      customerEntity.zipcode,
      customerEntity.city
    );

    customer.setAddress(address);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.repository.find();
    return customers.map((customer) => this.toEntity(customer));
  }

  async create(customer: Customer): Promise<void> {
    const customerEntity = this.repository.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    await this.repository.save(customerEntity);
  }
}
export { CustomerRepository };
