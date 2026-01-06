import { DataSource, EntityManager } from 'typeorm';
import { ProductEntity } from './entities/product.entity.js';
import { CustomerEntity } from './entities/customer.entity.js';
import { OrderEntity } from './entities/order.entity.js';
import { OrderItemEntity } from './entities/order-item.entity.js';

class Typeorm {
  private static dataSource: DataSource;
  private static testManager?: EntityManager;

  static getInstance(): DataSource {
    const isTest = process.env.NODE_ENV === 'test';

    if (!Typeorm.dataSource) {
      Typeorm.dataSource = new DataSource({
        type: 'better-sqlite3',
        database: isTest ? ':memory:' : 'orders.db',
        entities: [ProductEntity, CustomerEntity, OrderEntity, OrderItemEntity],
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

  // 👇 PONTO-CHAVE
  static setTestManager(manager: EntityManager) {
    this.testManager = manager;
  }

  static clearTestManager() {
    this.testManager = undefined;
  }

  static manager(): EntityManager {
    return this.testManager ?? this.getInstance().manager;
  }
}

export { Typeorm };
