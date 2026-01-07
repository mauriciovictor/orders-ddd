import { DataSource, EntityManager } from 'typeorm';
import { ProductEntity } from '../../product/repository/typeorm/entity/product.entity.js';
import { CustomerEntity } from '../../costumer/repository/typeorm/entity/customer.entity.js';
import { OrderEntity } from '../../checkout/repository/typeorm/entity/order.entity.js';
import { OrderItemEntity } from '../../checkout/repository/typeorm/entity/order-item.entity.js';

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
