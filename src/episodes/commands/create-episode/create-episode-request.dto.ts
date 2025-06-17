import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEpisodeRequestDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    type: 'number',
    description: 'order of the episode',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  episodeNumber: number;

  @ApiProperty({ type: 'number', description: 'in seconds' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  duration: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string' })
  @IsUUID(7)
  @IsNotEmpty()
  programId: string;

  @ApiProperty({ type: 'boolean', default: false })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isPublished: boolean = false;

  @ApiProperty({
    type: 'string',
    default: '',
    required: false,
    description: '**required** if `mediaFile` is not provided',
  })
  @IsOptional()
  mediaUrl?: string;

  @ApiProperty({
    type: 'string',
    default: null,
    format: 'binary',
    required: false,
    description: '**required** if `mediaUrl` is not provided',
  })
  mediaFile?: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  thumbnail: Express.Multer.File;
}
