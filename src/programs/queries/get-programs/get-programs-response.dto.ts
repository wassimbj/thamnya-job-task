import { ApiProperty } from '@nestjs/swagger';
import {
  ProgramLanguageEnum,
  ProgramPlatformEnum,
  ProgramTypeEnum,
} from 'src/programs/domain/models/program.model';

export class ProgramsListItemDto {
  @ApiProperty({})
  id: string;

  @ApiProperty({})
  title: string;

  @ApiProperty({})
  image: string;

  @ApiProperty({ enum: ProgramTypeEnum })
  type: ProgramTypeEnum;

  @ApiProperty({ enum: ProgramLanguageEnum })
  language: ProgramLanguageEnum;

  @ApiProperty({ type: 'number' })
  episodes_count: number;

  @ApiProperty({})
  slug: string;

  @ApiProperty({ type: 'string', nullable: true })
  author?: string;

  @ApiProperty({ enum: ProgramPlatformEnum })
  platform?: ProgramPlatformEnum;

  @ApiProperty({ type: Date })
  published_at?: Date;
}

export class GetProgramsResponseDto {
  @ApiProperty({ type: ProgramsListItemDto, isArray: true })
  programs: ProgramsListItemDto[];

  @ApiProperty({ type: 'number' })
  total: number;
}
