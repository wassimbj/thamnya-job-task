import {
  Body,
  Controller,
  Delete,
  Injectable,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CreateEpisodeRequestDto } from '../commands/create-episode/create-episode-request.dto';
import { CreateEpisodeCommand } from '../commands/create-episode/create-episode.command';
import { DeleteEpisodeCommand } from '../commands/delete-episode/delete-episode.command';
import { UpdateEpisodeRequestDto } from '../commands/update-episode/update-episode-request.dto';
import { UpdateEpisodeCommand } from '../commands/update-episode/update-episode.command';

// add internal guard
@ApiTags('internal episodes')
@Injectable()
@Controller('internal/episodes')
export class InternalEpisodeController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @Version('1')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mediaFile', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateEpisodeRequestDto })
  async create(
    @Body() data: CreateEpisodeRequestDto,
    @UploadedFiles()
    files: {
      mediaFile?: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    },
  ) {
    return await this.commandBus.execute(
      new CreateEpisodeCommand({
        ...data,
        mediaFile: !files.mediaFile ? undefined : files.mediaFile[0],
        thumbnail: files.thumbnail[0],
      }),
    );
  }

  @Patch(':id')
  @Version('1')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mediaFile', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateEpisodeRequestDto })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateEpisodeRequestDto,
    @UploadedFiles()
    files: {
      mediaFile?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
    },
  ) {
    await this.commandBus.execute(
      new UpdateEpisodeCommand(id, {
        ...data,
        mediaFile: !files.mediaFile ? undefined : files.mediaFile[0],
        thumbnail: !files.thumbnail ? undefined : files.thumbnail[0],
      }),
    );
  }

  @Delete(':id')
  @Version('1')
  async delete(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteEpisodeCommand(id));
  }
}
