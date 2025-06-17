import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { OffsetPaginationRequestDto } from 'src/shared/dtos/offset-pagination-request.dto';

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
}
