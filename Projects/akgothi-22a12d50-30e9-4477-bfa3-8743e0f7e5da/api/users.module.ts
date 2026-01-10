import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { OrganizationsModule } from './organizations.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [OrganizationsModule],
})
export class UsersModule {}
