import {
  Controller,
  Get,
  Injectable,
  Param,
  Query,
  Version,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetEpisodesRequestDto } from '../queries/get-episodes/get-episodes-request.dto';
import { GetEpisodesResponseDto } from '../queries/get-episodes/get-episodes-response.dto';
import { GetEpisodesQuery } from '../queries/get-episodes/get-episodes.query';
import { GetEpisodeQuery } from '../queries/get-episode/get-episode.query';
import { GetEpisodeResponseDto } from '../queries/get-episode/get-episode-response.dto';

@ApiTags('public episodes apis')
@Injectable()
@Controller('episodes')
export class PublicEpisodeController {
  constructor(private readonly queryBus: QueryBus) {}

  @Version('1')
  @Get()
  @ApiOkResponse({ type: GetEpisodesResponseDto })
  findAll(@Query() params: GetEpisodesRequestDto) {
    return this.queryBus.execute(new GetEpisodesQuery(params));
  }

  @Version('1')
  @Get(':id')
  @ApiOkResponse({ type: GetEpisodeResponseDto })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetEpisodeQuery(id));
  }
}
