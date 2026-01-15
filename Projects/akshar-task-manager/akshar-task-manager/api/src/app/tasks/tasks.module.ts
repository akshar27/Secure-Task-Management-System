import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],   // ✅ THIS IS THE FIX
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

