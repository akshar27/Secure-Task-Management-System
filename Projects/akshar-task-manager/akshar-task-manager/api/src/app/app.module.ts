import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [UsersModule, AuthModule, TasksModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
