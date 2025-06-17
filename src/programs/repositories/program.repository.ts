import {
  CreateProgramInput,
  FindAllProgramsFilters,
  FindAllProgramsFiltersWithPagination,
  FindAllProgramsResult,
  UpdateProgramInput,
} from './program.interface';

export abstract class ProgramRepository {
  abstract create(data: CreateProgramInput): Promise<string>;
  abstract update(id: string, data: UpdateProgramInput): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(
    filters: FindAllProgramsFiltersWithPagination,
  ): Promise<FindAllProgramsResult>;
  abstract countFindAll(filters: FindAllProgramsFilters): Promise<number>;
}
