import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { TaskService } from 'src/task/task.service';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) { }


  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new NotAcceptableException("Task not found")

    return user
  }

  async toggle(id: number) {

    const user = await this.findOne(id)

    return this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        isDone: !user.isDone
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
