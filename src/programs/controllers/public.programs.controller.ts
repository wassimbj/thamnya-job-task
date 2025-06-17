import { Controller, Get, Injectable, Query, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProgramsQuery } from '../queries/get-programs/get-programs.query';
import { GetProgramsRequestDto } from '../queries/get-programs/get-programs-request.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetProgramsResponseDto } from '../queries/get-programs/get-programs-response.dto';

@Injectable()
@Controller('programs')
export class PublicProgramController {
  constructor(private readonly queryBus: QueryBus) {}

  @Version('1')
  @Get()
  @ApiOkResponse({ type: GetProgramsResponseDto })
  search(@Query() params: GetProgramsRequestDto) {
    return this.queryBus.execute(new GetProgramsQuery(params));
  }
}
