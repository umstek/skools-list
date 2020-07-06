import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { School, CreateSchoolDto } from './school.schema';

@Injectable()
export class SchoolsService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) {}

  async getSome(offset: number, limit: number, filter: string): Promise<School[]> {
    let schools: School[];

    if (filter && filter.length > 0) {
      schools = await this.schoolModel
        .find({ $text: { $search: filter } })
        .skip(offset)
        .limit(limit)
        .exec();
    } else {
      schools = await this.schoolModel
        .find()
        .skip(offset)
        .limit(limit)
        .exec();
    }

    return schools;
  }

  async getOneById(id: string): Promise<School> {
    return this.schoolModel.findById(id).exec();
  }

  async create(school: CreateSchoolDto): Promise<string> {
    const createdSchool = await new this.schoolModel(school).save();
    return `"${createdSchool._id}"`;
  }
}
