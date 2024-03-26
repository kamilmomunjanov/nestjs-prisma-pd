import { Injectable, NotAcceptableException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    getAll() {
        return this.prisma.task.findMany()
    }



    create(dto: TaskDto) {
        return this.prisma.task.create({
            data: dto
        })
    }

    async getById(id: string) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: +id
            }
        })

        if (!task) throw new NotAcceptableException("Task not found")

        return task
    }


    async toggleDone(id: string) {
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
