import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/database.service';
import { uuidv7 } from 'uuidv7';
import {
  ProgramLanguageEnum,
  ProgramPlatformEnum,
  ProgramTypeEnum,
} from '../domain/models/program.model';
import {
  CreateProgramInput,
  FindAllProgramsFilters,
  FindAllProgramsFiltersWithPagination,
  FindAllProgramsResult,
  UpdateProgramInput,
} from './program.interface';
import { ProgramRepository } from './program.repository';
import { PublishStatusFilterEnum } from 'src/shared/types/publish-status-filter.type';

export class PrismaProgramRepository implements ProgramRepository {
  constructor(@Inject(PrismaService) readonly prisma: PrismaService) {}

  async create(data: CreateProgramInput): Promise<string> {
    const id = uuidv7();
    await this.prisma.program.create({
      data: {
        id,
        ...data,
      },
    });

    return id;
  }

  async update(id: string, data: UpdateProgramInput): Promise<void> {
    await this.prisma.program.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.program.delete({
      where: {
        id,
      },
    });
  }

  async findAll(
    filters: FindAllProgramsFiltersWithPagination,
  ): Promise<FindAllProgramsResult> {
    const programs = await this.prisma.program.findMany({
      where: this.findAllFilters(filters),
      take: filters.limit,
      skip: filters.offset,
    });

    return programs.map((program) => ({
      id: program.id,
      type: program.type as ProgramTypeEnum,
      episodes_count: program.episodes_count,
      title: program.title,
      language: program.language as ProgramLanguageEnum,
      author: program.author ?? undefined,
      platform: program.platform as ProgramPlatformEnum,
      published_at: program.published_at ?? undefined,
      image: program.image_url,
      slug: program.slug,
    }));
  }

  async countFindAll(filters: FindAllProgramsFilters): Promise<number> {
    return await this.prisma.program.count({
      where: this.findAllFilters(filters),
    });
  }

  private findAllFilters(
    filters: FindAllProgramsFilters,
  ): Prisma.ProgramWhereInput {
    const where: Prisma.ProgramWhereInput = {};

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.status === PublishStatusFilterEnum.Published) {
      where.published_at = {
        not: null,
      };
    } else if (filters.status === PublishStatusFilterEnum.UnPublished) {
      where.published_at = null;
    }

    if (filters.query) {
      where.OR = [
        {
          title: {
            contains: filters.query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filters.query,
            mode: 'insensitive',
          },
        },
      ];
    }

    return where;
  }
}
