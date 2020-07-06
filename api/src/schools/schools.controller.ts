import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { School, CreateSchoolDto } from './school.schema';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  find(
    @Query('offset') offset = 0,
    @Query('limit') limit = 5,
    @Query('filter') filter = '',
  ): Promise<School[]> {
    return this.schoolsService.getSome(Number(offset), Number(limit), filter);
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<School> {
    return this.schoolsService.getOneById(id);
  }

  @Post()
  post(@Body() school: CreateSchoolDto): Promise<string> {
    return this.schoolsService.create(school);
  }
}
