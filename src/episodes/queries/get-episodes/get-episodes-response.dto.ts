import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDto {
  @ApiProperty({})
  id: string;

  @ApiProperty({})
  title: string;

  @ApiProperty({})
  description: string;

  @ApiProperty({})
  media_url: string;

  @ApiProperty({ type: 'number' })
  episode_number: number;

  @ApiProperty({})
  thumbnail_url: string;

  @ApiProperty({ type: Date })
  published_at?: Date;

  @ApiProperty({
    type: 'string',
  })
  program_title: string;
}

export class GetEpisodesResponseDto {
  @ApiProperty({ type: EpisodeDto, isArray: true })
  episodes: EpisodeDto[];

  @ApiProperty({ type: 'number' })
  total: number;
}
