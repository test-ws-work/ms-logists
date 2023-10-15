import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LogistEntity } from '../entities/logist.entity';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';

@Injectable()
export class LogistsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: LogistDtoRequest): Promise<LogistEntity> {
    const logist = await this.prisma.logist.create({
      data: dto,
    });

    return logist;
  }

  async findOne(logistId: number): Promise<LogistEntity> {
    const logist = await this.prisma.logist.findUnique({
      where: {
        id: logistId,
      },
    });

    return logist;
  }

  async update(logistId: number, dto: LogistDtoRequest): Promise<LogistEntity> {
    const logist = await this.prisma.logist.update({
      data: dto,
      where: {
        id: logistId,
      },
    });

    return logist;
  }

  async delete(logistId: number) {
    return this.prisma.logist.delete({
      where: {
        id: logistId,
      },
    });
  }

  async findByEmail(email: string): Promise<LogistEntity> {
    const logist = this.prisma.logist.findFirst({
      where: {
        email,
      },
    });

    return logist;
  }
}
