import { OffsetPaginationFilters } from 'src/shared/types/offset-pagination-request.interface';
import { EpisodeModel } from '../domain/models/episode.model';
import { EpisodesListItemDto } from '../queries/get-episodes/get-episodes-response.dto';
import { EpisodeDto } from '../queries/get-episode/get-episode-response.dto';
import { PublishStatusFilterEnum } from 'src/shared/types/publish-status-filter.type';

export type CreateEpisodeInput = Omit<
  EpisodeModel,
  'id' | 'updated_at' | 'created_at'
>;

export type UpdateEpisodeInput = Partial<
  Omit<EpisodeModel, 'id' | 'updated_at' | 'created_at' | 'program_id'>
>;

export type FindAllEpisodesFilters = {
  programId?: string;
  query?: string;
  includeProgramTitle?: boolean;
  status?: PublishStatusFilterEnum;
};

export type FindAllEpisodesFiltersWithPagination = FindAllEpisodesFilters &
  OffsetPaginationFilters;

export type FindAllEpisodesResult = Array<EpisodesListItemDto>;

export type FindOneEpisodeResult = EpisodeDto | undefined;
