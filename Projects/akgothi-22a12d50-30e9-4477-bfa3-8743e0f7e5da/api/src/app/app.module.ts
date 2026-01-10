import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from '../../users.module';
import { OrganizationsModule } from '../../organizations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,          // ✅ import feature modules
    OrganizationsModule,  // ✅ import feature modules
  ],
  controllers: [
    AppController, // ✅ ONLY root controller here
  ],
})
export class AppModule {}
