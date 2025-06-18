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
  duration?: number;

  @ApiProperty({ type: 'number' })
  episode_number: number;

  @ApiProperty({})
  thumbnail_url: string;

  @ApiProperty({ type: Date })
  published_at?: Date;
}

export class GetEpisodeResponseDto {
  @ApiProperty({ type: EpisodeDto })
  episode?: EpisodeDto;
}
