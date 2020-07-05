import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { School } from './school.entity';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  find(
    @Query('offset') offset = 0,
    @Query('limit') limit = 5,
    @Query('filter') filter = '',
  ): School[] {
    return this.schoolsService.getSome(offset, limit, filter);
  }

  @Get(':id')
  get(@Param('id') id: string): School {
    return this.schoolsService.getOneById(id);
  }

  @Post()
  post(@Body() school: School): string {
    return this.schoolsService.create(school);
  }
}
