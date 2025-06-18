import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { OffsetPaginationRequestDto } from 'src/shared/dtos/offset-pagination-request.dto';
import { PublishStatusFilterEnum } from 'src/shared/types/publish-status-filter.type';

export class GetEpisodesRequestDto extends OffsetPaginationRequestDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  query?: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  programId?: string;

  @ApiProperty({ type: 'boolean', required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  includeProgramTitle?: boolean;

  @ApiProperty({
    type: 'string',
    enum: PublishStatusFilterEnum,
    required: false,
  })
  @IsEnum(PublishStatusFilterEnum)
  @IsOptional()
  status?: PublishStatusFilterEnum;
}
