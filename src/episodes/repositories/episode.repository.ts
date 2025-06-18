import {
  CreateEpisodeInput,
  FindAllEpisodesFilters,
  FindAllEpisodesFiltersWithPagination,
  FindAllEpisodesResult,
  FindOneEpisodeResult,
  UpdateEpisodeInput,
} from './episode.interface';

export abstract class EpisodeRepository {
  abstract create(data: CreateEpisodeInput): Promise<string>;
  abstract update(id: string, data: UpdateEpisodeInput): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(id: string): Promise<FindOneEpisodeResult>;
  abstract findAll(
    filters: FindAllEpisodesFiltersWithPagination,
  ): Promise<FindAllEpisodesResult>;

  abstract countFindAll(filters: FindAllEpisodesFilters): Promise<number>;
}
