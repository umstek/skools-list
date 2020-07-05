import { Injectable } from '@nestjs/common';
import { School } from './school.entity';

@Injectable()
export class SchoolsService {
  getSome(offset: number, limit: number, filter: string): School[] {
    return [
      {
        name: filter || 'Xavier Institute',
        studentCount: 2292,
        address: {
          state: 'New York',
          postcode: '81034',
          suburb: 'Salem Center',
          street: '1407 Graymalkin Lane',
        },
      },
      {
        name: filter || 'Xavier Institute',
        studentCount: 2292,
        address: {
          state: 'New York',
          postcode: '81034',
          suburb: 'Salem Center',
          street: '1407 Graymalkin Lane',
        },
      },
    ];
  }

  getOneById(id: string): School {
    return {
      name: 'Xavier Institute',
      studentCount: 2292,
      address: {
        state: 'New York',
        postcode: id,
        suburb: 'Salem Center',
        street: '1407 Graymalkin Lane',
      },
    };
  }

  create(school: School): string {
    return 'am40igm2nalf3';
  }
}
