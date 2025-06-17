import { Controller, Get, Injectable, Query, Version } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetEpisodesRequestDto } from '../queries/get-episodes/get-episodes-request.dto';
import { GetEpisodesResponseDto } from '../queries/get-episodes/get-episodes-response.dto';
import { GetEpisodesQuery } from '../queries/get-episodes/get-episodes.query';

@ApiTags('public episodes apis')
@Injectable()
@Controller('episodes')
export class PublicEpisodeController {
  constructor(private readonly queryBus: QueryBus) {}

  @Version('1')
  @Get()
  @ApiOkResponse({ type: GetEpisodesResponseDto })
  search(@Query() params: GetEpisodesRequestDto) {
    return this.queryBus.execute(new GetEpisodesQuery(params));
  }
}
