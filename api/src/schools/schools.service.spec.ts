import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TestDatabaseModule } from '../testDatabase.module';
import { School, SchoolSchema } from './school.schema';
import { SchoolsService } from './schools.service';

describe('SchoolsService', () => {
  let service: SchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
      ],
      providers: [SchoolsService],
    }).compile();

    service = module.get<SchoolsService>(SchoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
