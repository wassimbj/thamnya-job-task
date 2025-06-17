import { OffsetPaginationFilters } from 'src/shared/interfaces/offset-pagination-request.interface';
import { EpisodeModel } from '../domain/models/episode.model';
import { EpisodeDto } from '../queries/get-episodes/get-episodes-response.dto';

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
};

export type FindAllEpisodesFiltersWithPagination = FindAllEpisodesFilters &
  OffsetPaginationFilters;

export type FindAllEpisodesResult = Array<EpisodeDto>;
