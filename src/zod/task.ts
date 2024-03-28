import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const TaskModel = z.object({
  id: z.number().int(),
  name: z.string(),
  isDone: z.boolean().nullish(),
})

export class TaskDto extends createZodDto(TaskModel) {
}
