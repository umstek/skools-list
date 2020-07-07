import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TestDatabaseModule } from '../testDatabase.module';
import { School, SchoolSchema } from './school.schema';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';

describe('Schools Controller', () => {
  let controller: SchoolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
      ],
      providers: [SchoolsService],
      controllers: [SchoolsController],
    }).compile();

    controller = module.get<SchoolsController>(SchoolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
