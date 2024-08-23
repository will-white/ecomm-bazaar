import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import schema from 'db/schema';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { DB_CONNECTION } from 'src/drizzle.module';

@Injectable()
export class ListingsService {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private readonly logger = new Logger(ListingsService.name);

  constructor(
    @Inject(DB_CONNECTION) private db: MySql2Database<typeof schema>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createListingDto: CreateListingDto) {
    return 'This action adds a new listing';
  }

  findAll() {
    return `This action returns all listings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
