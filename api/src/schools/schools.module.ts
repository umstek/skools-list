import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { SchoolSchema, School } from './school.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }])],
  providers: [SchoolsService],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
