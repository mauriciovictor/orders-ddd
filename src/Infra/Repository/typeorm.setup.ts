import { beforeEach, beforeAll, afterEach, afterAll } from 'vitest';
import { Typeorm } from '../DB/typeorm/index.js';
import { QueryRunner } from 'typeorm';

let queryRunner: QueryRunner;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await Typeorm.connect();
});

beforeEach(async () => {
  const dataSource = Typeorm.getInstance();
  queryRunner = dataSource.createQueryRunner();
  await queryRunner.startTransaction();
  Typeorm.setTestManager(queryRunner.manager);
});

afterEach(async () => {
  await queryRunner.rollbackTransaction();
  await queryRunner.release();
  Typeorm.clearTestManager();
});

afterAll(async () => {
  await Typeorm.getInstance().destroy();
});
