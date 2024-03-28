import * as z from "nestjs-zod/z"
import { createZodDto } from "nestjs-zod/dto"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().nullish(),
  isDone: z.boolean().nullish(),
})

export class UserDto extends createZodDto(UserModel) {
}
