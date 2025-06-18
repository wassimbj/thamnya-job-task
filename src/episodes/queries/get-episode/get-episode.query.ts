import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from 'src/episodes/repositories/episode.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { GetEpisodeResponseDto } from './get-episode-response.dto';

export class GetEpisodeQuery extends Query<GetEpisodeResponseDto> {
  constructor(public readonly episodeId: string) {
    super();
  }
}

@QueryHandler(GetEpisodeQuery)
export class GetEpisodeQueryHandler implements IQueryHandler<GetEpisodeQuery> {
  constructor(
    readonly episodeRepo: EpisodeRepository,
    readonly fileStorage: FileStorage,
  ) {}

  async execute(query: GetEpisodeQuery): Promise<GetEpisodeResponseDto> {
    const episode = await this.episodeRepo.findOne(query.episodeId);
    return {
      episode,
    };
  }
}
