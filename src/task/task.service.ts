import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-user.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    getAll() {
        return this.prisma.task.findMany()
    }

    create(dto: CreateTaskDto) {
        return this.prisma.task.create({
            data: dto
        })
    }

    update(id: number, dto: UpdateTaskDto) {
        return this.prisma.task.update({
            where: { id },
            data: dto
        })
    }

    async getById(id: number) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: +id
            }
        })

        if (!task) throw new NotAcceptableException("Task not found")

        return task
    }


    async toggleDone(id: number) {
        const task = await this.getById(id)

        return this.prisma.task.update({
            where: {
                id: task.id
            },
            data: {
                isDone: !task.isDone
            }
        })
    }
}
