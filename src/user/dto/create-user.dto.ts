
import { createZodDto } from "nestjs-zod";
import { UserModel } from "src/zod";

export const createUserSchema = UserModel.omit({
    id: true,
    isDone: true,
})

export class CreateUserDto extends createZodDto(createUserSchema) { }