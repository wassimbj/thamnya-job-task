import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateProgramRequestDto } from '../create-program/create-program-request.dto';
import { IsOptional } from 'class-validator';

export class UpdateProgramRequestDto extends OmitType(CreateProgramRequestDto, [
  'image',
]) {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: Express.Multer.File;
}
