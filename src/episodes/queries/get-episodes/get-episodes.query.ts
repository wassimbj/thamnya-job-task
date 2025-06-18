import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from 'src/episodes/repositories/episode.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { GetEpisodesResponseDto } from './get-episodes-response.dto';
import { GetEpisodesRequestDto } from './get-episodes-request.dto';

export class GetEpisodesQuery extends Query<GetEpisodesResponseDto> {
  constructor(public readonly data: GetEpisodesRequestDto) {
    super();
  }
}

@QueryHandler(GetEpisodesQuery)
export class GetEpisodesQueryHandler
  implements IQueryHandler<GetEpisodesQuery>
{
  constructor(
    readonly episodeRepo: EpisodeRepository,
    readonly fileStorage: FileStorage,
  ) {}

  async execute(query: GetEpisodesQuery): Promise<GetEpisodesResponseDto> {
    const episodes = await this.episodeRepo.findAll({
      programId: query.data.programId,
      includeProgramTitle: query.data.includeProgramTitle,
      status: query.data.status,
      query: query.data.query,
      limit: query.data.limit,
      offset: query.data.offset,
    });

    const total = await this.episodeRepo.countFindAll({
      programId: query.data.programId,
      query: query.data.query,
      status: query.data.status,
    });

    return {
      episodes,
      total,
    };
  }
}
