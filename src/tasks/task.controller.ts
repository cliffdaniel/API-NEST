import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TaskService } from './application/task.service';
import { Task } from './domain/task.entity';
import { CreateTaskDto } from './dtos';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Post()
  async createTask(@Body() taskData: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(taskData);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updatedTask: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updatedTask);
  }
}
