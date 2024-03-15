import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { DrizzleModule } from 'src/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
