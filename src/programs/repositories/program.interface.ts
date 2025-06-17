import { ProgramModel, ProgramTypeEnum } from '../domain/models/program.model';
import { OffsetPaginationFilters } from 'src/shared/interfaces/offset-pagination-request.interface';
import { ProgramDto } from '../queries/get-programs/get-programs-response.dto';

export type CreateProgramInput = Omit<
  ProgramModel,
  'id' | 'updated_at' | 'created_at'
>;

export type UpdateProgramInput = Partial<
  Omit<ProgramModel, 'id' | 'updated_at' | 'created_at'>
>;

export type FindAllProgramsFilters = {
  query?: string;
  type?: ProgramTypeEnum;
};

export type FindAllProgramsFiltersWithPagination = FindAllProgramsFilters &
  OffsetPaginationFilters;

export type FindAllProgramsResult = ProgramDto[];
