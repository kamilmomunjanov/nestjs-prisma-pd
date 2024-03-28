import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
