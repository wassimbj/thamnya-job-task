import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from 'src/episodes/repositories/episode.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { CreateEpisodeRequestDto } from './create-episode-request.dto';
import { CreateEpisodeResponseDto } from './create-episode-response.dto';
import { BadRequestException } from '@nestjs/common';

export class CreateEpisodeCommand extends Command<CreateEpisodeResponseDto> {
  constructor(public readonly data: CreateEpisodeRequestDto) {
    super();
  }
}

@CommandHandler(CreateEpisodeCommand)
export class CreateEpisodeCommandHandler
  implements ICommandHandler<CreateEpisodeCommand>
{
  constructor(
    readonly episodeRepo: EpisodeRepository,
    readonly fileStorage: FileStorage,
  ) {}

  async execute(command: CreateEpisodeCommand) {
    let mediaUrl = '';

    if (command.data.mediaFile) {
      const uploadedMediaFile = await this.fileStorage.upload(
        command.data.mediaFile,
      );
      mediaUrl = uploadedMediaFile.path;
    } else if (command.data.mediaUrl) {
      mediaUrl = command.data.mediaUrl;
    }

    if (!mediaUrl) {
      throw new BadRequestException('missing media file or url');
    }

    const thumbnail = await this.fileStorage.upload(command.data.thumbnail);

    const episodeId = await this.episodeRepo.create({
      episode_number: command.data.episodeNumber,
      media_url: mediaUrl,
      duration: command.data.duration,
      program_id: command.data.programId,
      thumbnail_url: thumbnail.path,
      description: command.data.description,
      title: command.data.title,
      published_at: command.data.isPublished ? new Date() : undefined,
    });

    return {
      episodeId,
    };
  }
}
