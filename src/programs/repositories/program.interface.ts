import { ProgramModel, ProgramTypeEnum } from '../domain/models/program.model';
import { OffsetPaginationFilters } from 'src/shared/types/offset-pagination-request.interface';
import { ProgramsListItemDto } from '../queries/get-programs/get-programs-response.dto';
import { PublishStatusFilterEnum } from 'src/shared/types/publish-status-filter.type';

export type CreateProgramInput = Omit<
  ProgramModel,
  'id' | 'updated_at' | 'created_at' | 'episodes_count'
>;

export type UpdateProgramInput = Partial<
  Omit<ProgramModel, 'id' | 'updated_at' | 'created_at' | 'episodes_count'>
>;

export type FindAllProgramsFilters = {
  query?: string;
  type?: ProgramTypeEnum;
  status?: PublishStatusFilterEnum;
};

export type FindAllProgramsFiltersWithPagination = FindAllProgramsFilters &
  OffsetPaginationFilters;

export type FindAllProgramsResult = ProgramsListItemDto[];
