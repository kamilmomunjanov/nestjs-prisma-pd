
import { createZodDto } from 'nestjs-zod';
import { TaskModel } from 'src/zod';

export const updateTaskSchema = TaskModel.omit({
    id: true,
}).partial()

export class UpdateTaskDto extends createZodDto(updateTaskSchema) { }