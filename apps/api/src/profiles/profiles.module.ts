import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { DrizzleModule } from 'src/drizzle.module';
import { PersonalInfoService } from './personal-info.service';

@Module({
  imports: [DrizzleModule],
  providers: [PersonalInfoService],
  // exports: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
