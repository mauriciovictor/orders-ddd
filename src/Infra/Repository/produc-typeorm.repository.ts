import { RepositoryInterface } from '../../Domain/Repositoory/repository-interface.js';
import { Product } from '../../Domain/Entity/product.js';
import { Repository } from 'typeorm';
import { Typeorm } from '../DB/typeorm/index.js';
import { ProductEntity } from '../DB/typeorm/entities/product.entity.js';

class ProductRepository implements RepositoryInterface<Product> {
  private get repository(): Repository<ProductEntity> {
    return Typeorm.manager().getRepository(ProductEntity);
  }

  async update(entity: Product): Promise<void> {
    await this.repository.update(entity._id, {
      name: entity.name,
      price: entity.price,
    });
  }

  async findById(id: string): Promise<Product | undefined> {
    const productModel = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    return productModel ? this.toEntity(productModel) : undefined;
  }

  toEntity(productEntity: ProductEntity): Product {
    return new Product(productEntity.id, productEntity.name, productEntity.price);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();

    return products.map((product) => this.toEntity(product));
  }

  async create(product: Product): Promise<void> {
    const productEntity = this.repository.create({
      id: product._id,
      name: product.name,
      price: product.price,
    });

    await this.repository.save(productEntity);
  }
}
export { ProductRepository };
