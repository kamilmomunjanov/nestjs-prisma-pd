
import { createZodDto } from "nestjs-zod";
import { TaskModel } from "src/zod";

export const createTaskSchema = TaskModel.omit({
    id: true,
    isDone: true,
})

export class CreateTaskDto extends createZodDto(createTaskSchema) { }