import { Inject } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/database.service';
import { uuidv7 } from 'uuidv7';
import {
  CreateEpisodeInput,
  FindAllEpisodesFilters,
  FindAllEpisodesFiltersWithPagination,
  FindAllEpisodesResult,
  UpdateEpisodeInput,
} from './episode.interface';
import { EpisodeRepository } from './episode.repository';

export class PrismaEpisodeRepository implements EpisodeRepository {
  constructor(@Inject(PrismaService) readonly prisma: PrismaService) {}

  async create(data: CreateEpisodeInput): Promise<string> {
    const id = uuidv7();
    await this.prisma.$transaction(async (tx) => {
      // episode must be published to be counted
      if (data.published_at) {
        await tx.program.update({
          where: {
            id: data.program_id,
          },
          data: {
            episodes_count: {
              increment: 1,
            },
          },
        });
      }
      await tx.episode.create({
        data: {
          id,
          ...data,
        },
      });
    });

    return id;
  }

  async update(id: string, data: UpdateEpisodeInput): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const episode = await tx.episode.findFirst({
        where: {
          id,
        },
        select: { published_at: true, program_id: true },
      });

      if (!episode) {
        return;
      }

      await tx.episode.update({
        data,
        where: {
          id,
        },
      });

      // state changed to published
      const isPublished = !episode.published_at && data.published_at;
      // state changed to unpublished
      const isUnpublished = episode.published_at && !data.published_at;

      if (isPublished || isUnpublished) {
        await tx.program.update({
          where: {
            id: episode.program_id,
          },
          data: {
            episodes_count: isPublished
              ? {
                  increment: 1,
                }
              : {
                  decrement: 1,
                },
          },
        });
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const deleteResult = await tx.episode.delete({
        where: {
          id,
        },
        select: { program_id: true },
      });

      await tx.program.update({
        where: {
          id: deleteResult.program_id,
        },
        data: {
          episodes_count: {
            decrement: 1,
          },
        },
      });
    });
  }

  async findAll(
    filters: FindAllEpisodesFiltersWithPagination,
  ): Promise<FindAllEpisodesResult> {
    const episodes = await this.prisma.episode.findMany({
      where: this.findAllFilters(filters),
      skip: filters.offset,
      take: filters.limit,
      orderBy: {
        episode_number: 'asc',
      },
      include: {
        program: filters.includeProgramTitle
          ? {
              select: {
                title: true,
              },
            }
          : false,
      },
    });

    return episodes.map((episode) => ({
      id: episode.id,
      duration: episode.duration ?? undefined,
      media_url: episode.media_url,
      program_id: episode.program_id,
      episode_number: episode.episode_number,
      thumbnail_url: episode.thumbnail_url,
      description: episode.description,
      title: episode.title,
      program_title: episode?.program?.title,
      published_at: episode.published_at ?? undefined,
    }));
  }

  async countFindAll(filters: FindAllEpisodesFilters): Promise<number> {
    return await this.prisma.episode.count({
      where: this.findAllFilters(filters),
    });
  }

  private findAllFilters(
    filters: FindAllEpisodesFilters,
  ): Prisma.EpisodeWhereInput {
    const where: Prisma.EpisodeWhereInput = {};

    if (filters.programId) {
      where.program_id = filters.programId;
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
