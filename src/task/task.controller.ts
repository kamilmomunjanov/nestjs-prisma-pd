import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-user.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { stringInt } from 'src/schemas/stringNumber';
import { TaskDto } from 'src/zod';
import { ApiResponse } from '@nestjs/swagger';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @ApiResponse({
    status: 200,
    type: [TaskDto]
  })
  @Get()
  async getTasks(): Promise<TaskDto[]> {
    return await this.taskService.getAll()
  }

  @ApiResponse({
    status: 201,
    type: TaskDto
  })
  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto)
  }

  @ApiResponse({
    status: 200,
    type: TaskDto
  })
  @Get(":id")
  async getTaskById(@Param("id", new ZodValidationPipe(stringInt)) id: number) {
    return this.taskService.getById(id)
  }

  @ApiResponse({
    status: 200,
    type: TaskDto
  })
  @Patch(":id")
  async update(
    @Param('id', new ZodValidationPipe(stringInt)) id: number,
    @Body() dto: UpdateTaskDto
  ) {
    return this.taskService.update(id, dto)
  }

  @ApiResponse({
    status: 201,
    type: TaskDto
  })
  @Post(":id/toggle")
  async toggleDone(@Param('id', new ZodValidationPipe(stringInt)) id: number) {
    return this.taskService.toggleDone(id)
  }
}
