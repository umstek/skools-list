import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';

@Module({
  providers: [SchoolsService],
  controllers: [SchoolsController]
})
export class SchoolsModule {}
