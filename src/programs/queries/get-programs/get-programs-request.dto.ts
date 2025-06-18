import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import {
  ProgramLanguageEnum,
  ProgramTypeEnum,
} from 'src/programs/domain/models/program.model';
import { OffsetPaginationRequestDto } from 'src/shared/dtos/offset-pagination-request.dto';
import { PublishStatusFilterEnum } from 'src/shared/types/publish-status-filter.type';

export class GetProgramsRequestDto extends OffsetPaginationRequestDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  query?: string;

  @ApiProperty({ type: 'string', enum: ProgramTypeEnum, required: false })
  @IsEnum(ProgramTypeEnum)
  @IsOptional()
  type?: ProgramTypeEnum;

  @ApiProperty({
    type: 'string',
    enum: PublishStatusFilterEnum,
    required: false,
  })
  @IsEnum(PublishStatusFilterEnum)
  @IsOptional()
  status?: PublishStatusFilterEnum;

  @ApiProperty({
    type: 'string',
    enum: ProgramLanguageEnum,
    required: false,
  })
  @IsEnum(ProgramLanguageEnum)
  @IsOptional()
  language?: ProgramLanguageEnum;
}
