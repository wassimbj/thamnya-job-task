// src/prisma/prisma.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  logger: Logger = new Logger('PrismaService');

  async onModuleInit() {
    this.logger.log('Database is connected');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
