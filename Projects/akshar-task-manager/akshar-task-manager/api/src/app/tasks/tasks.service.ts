import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';

interface Task {
  id: number;
  title: string;
  status: string;
  category: string;
  organizationId: number;
  createdBy: number;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly auditService: AuditService) {}

  findAll(user: any) {
    this.auditService.log('VIEWED TASKS', user);
    return this.tasks.filter(
      (task) => task.organizationId === user.orgId
    );
  }

  create(task: any, user: any) {
    if (user.role === 'VIEWER') {
      throw new ForbiddenException('Viewers cannot create tasks');
    }

    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      status: task.status ?? 'OPEN',
      category: task.category ?? 'General',
      organizationId: user.orgId,
      createdBy: user.userId,
    };

    this.tasks.push(newTask);

    this.auditService.log('CREATED TASK', user, {
      taskId: newTask.id,
      title: newTask.title,
    });

    return newTask;
  }

  update(id: number, updates: any, user: any) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;

    if (user.role === 'VIEWER') {
      throw new ForbiddenException();
    }

    if (user.role === 'ADMIN' && task.createdBy !== user.userId) {
      throw new ForbiddenException('Admins can only edit own tasks');
    }

    Object.assign(task, updates);

    this.auditService.log('UPDATED TASK', user, {
      taskId: id,
      updates,
    });

    return task;
  }

  remove(id: number, user: any) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;

    if (user.role !== 'OWNER') {
      throw new ForbiddenException('Only owners can delete tasks');
    }

    this.tasks = this.tasks.filter((t) => t.id !== id);

    this.auditService.log('DELETED TASK', user, { taskId: id });

    return { deleted: true };
  }
}
