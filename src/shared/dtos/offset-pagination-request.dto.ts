import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class OffsetPaginationRequestDto {
  @ApiProperty({ type: 'number', default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;

  @ApiProperty({ type: 'number', default: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 20;
}
