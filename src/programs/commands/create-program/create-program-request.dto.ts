import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  ProgramLanguageEnum,
  ProgramTypeEnum,
} from 'src/programs/domain/models/program.model';

export class CreateProgramRequestDto {
  @IsEnum(ProgramTypeEnum)
  @ApiProperty({ type: 'string', enum: ProgramTypeEnum })
  type: ProgramTypeEnum;

  @IsEnum(ProgramLanguageEnum)
  @ApiProperty({
    type: 'string',
    enum: ProgramLanguageEnum,
    default: ProgramLanguageEnum.Arabic,
  })
  language: ProgramLanguageEnum = ProgramLanguageEnum.Arabic;

  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({ type: 'string' })
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^\S*$/, { message: 'No spaces are allowed' })
  @ApiProperty({ type: 'string' })
  slug: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  description: string;

  @IsOptional()
  @ApiProperty({ type: 'string', required: false })
  author?: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @ApiProperty({ type: 'boolean', default: false })
  isPublished: boolean = false;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
