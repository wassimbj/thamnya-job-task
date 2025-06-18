import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { ProgramRepository } from 'src/programs/repositories/program.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { GetProgramsRequestDto } from './get-programs-request.dto';
import { GetProgramsResponseDto } from './get-programs-response.dto';

export class GetProgramsQuery extends Query<GetProgramsResponseDto> {
  constructor(public readonly data: GetProgramsRequestDto) {
    super();
  }
}

@QueryHandler(GetProgramsQuery)
export class GetProgramsQueryHandler
  implements IQueryHandler<GetProgramsQuery>
{
  constructor(
    readonly programRepo: ProgramRepository,
    readonly fileStorage: FileStorage,
  ) {}

  async execute(query: GetProgramsQuery): Promise<GetProgramsResponseDto> {
    const programs = await this.programRepo.findAll({
      type: query.data.type,
      query: query.data.query,
      limit: query.data.limit,
      offset: query.data.offset,
      status: query.data.status,
    });

    const total = await this.programRepo.countFindAll({
      type: query.data.type,
      query: query.data.query,
      status: query.data.status,
    });

    return {
      programs,
      total,
    };
  }
}
