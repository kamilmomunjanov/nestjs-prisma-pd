
import { createZodDto } from 'nestjs-zod';
import { UserModel } from 'src/zod';

export const updateUserSchema = UserModel.omit({
    id: true,
}).partial()

export class UpdateUserDto extends createZodDto(updateUserSchema) { }