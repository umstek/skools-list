import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/schools (GET)', () => {
    return request(app.getHttpServer())
      .get('/schools')
      .expect(200)
      .expect(res => res.body.length > 0)
      .expect(res => Array.isArray(res.body) && res.body.length <= 5);
  });

  it('/schools?offset=1&limit=2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/schools?offset=1&limit=2')
      .expect(200)
      .expect(res => res.body.length > 0)
      .expect(res => Array.isArray(res.body) && res.body.length <= 2);
  });
});
