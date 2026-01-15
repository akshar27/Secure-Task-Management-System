import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user);
  }

  @Post()
  create(@Body() body: any, @Request() req: any) {
    return this.tasksService.create(body, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req: any
  ) {
    return this.tasksService.update(+id, body, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.remove(+id, req.user);
  }
}
