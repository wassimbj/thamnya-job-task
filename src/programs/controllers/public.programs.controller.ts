import { Controller, Get, Injectable, Query, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProgramsQuery } from '../queries/get-programs/get-programs.query';
import { GetProgramsRequestDto } from '../queries/get-programs/get-programs-request.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetProgramsResponseDto } from '../queries/get-programs/get-programs-response.dto';

@ApiTags('public programs apis')
@Injectable()
@Controller('programs')
export class PublicProgramController {
  constructor(private readonly queryBus: QueryBus) {}

  @Version('1')
  @Get()
  @ApiOkResponse({ type: GetProgramsResponseDto })
  findAll(@Query() params: GetProgramsRequestDto) {
    return this.queryBus.execute(new GetProgramsQuery(params));
  }
}
