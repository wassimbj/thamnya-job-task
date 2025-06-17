import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateEpisodeRequestDto } from '../create-episode/create-episode-request.dto';

export class UpdateEpisodeRequestDto extends OmitType(CreateEpisodeRequestDto, [
  'mediaFile',
  'thumbnail',
  'programId',
]) {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  mediaFile?: Express.Multer.File;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  thumbnail?: Express.Multer.File;
}
