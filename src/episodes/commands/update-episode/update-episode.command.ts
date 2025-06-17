import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEpisodeInput } from 'src/episodes/repositories/episode.interface';
import { EpisodeRepository } from 'src/episodes/repositories/episode.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { UpdateEpisodeRequestDto } from './update-episode-request.dto';

export class UpdateEpisodeCommand extends Command<void> {
  constructor(
    public readonly programId: string,
    public readonly data: UpdateEpisodeRequestDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateEpisodeCommand)
export class UpdateEpisodeCommandHandler
  implements ICommandHandler<UpdateEpisodeCommand>
{
  constructor(
    readonly episodeRepo: EpisodeRepository,
    readonly fileStorage: FileStorage,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: UpdateEpisodeCommand) {
    const {
      mediaFile,
      thumbnail,
      isPublished,
      description,
      duration,
      episodeNumber,
      title,
      mediaUrl,
    } = command.data;

    const data: UpdateEpisodeInput = {
      description,
      duration,
      title,
      episode_number: episodeNumber,
      published_at: isPublished ? new Date() : null,
    };

    if (mediaFile) {
      const uploadedFile = await this.fileStorage.upload(mediaFile);
      data.media_url = uploadedFile.path;
    } else if (mediaUrl) {
      data.media_url = mediaUrl;
    }

    if (thumbnail) {
      const uploadedFile = await this.fileStorage.upload(thumbnail);
      data.thumbnail_url = uploadedFile.path;
    }

    await this.episodeRepo.update(command.programId, data);
  }
}
