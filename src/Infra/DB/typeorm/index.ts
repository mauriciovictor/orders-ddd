import { DataSource } from 'typeorm';
import { ProductEntity } from './entities/product.entity.js';
import { CustomerEntity } from './entities/customer.entity.js';

class Typeorm {
  private static dataSource: DataSource;

  static getInstance(): DataSource {
    if (!Typeorm.dataSource) {
      Typeorm.dataSource = new DataSource({
        type: 'better-sqlite3',
        database: 'orders.db',
        entities: [ProductEntity, CustomerEntity],
        synchronize: true,
      });
    }

    return Typeorm.dataSource;
  }

  static async connect(): Promise<DataSource> {
    const dataSource = Typeorm.getInstance();

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    return dataSource;
  }
}

export { Typeorm };
