import { Module } from '@nestjs/common';
import { LogistsService } from './services/logists.service';
import { LogistsController } from './controllers/logists.controller';
import { LogistsRepository } from './repositories/logist.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LogistsController],
  providers: [LogistsService, PrismaService, LogistsRepository],
})
export class LogistsModule {}
