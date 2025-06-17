import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from 'src/episodes/repositories/episode.repository';

export class DeleteEpisodeCommand extends Command<void> {
  constructor(public readonly episodeId: string) {
    super();
  }
}

@CommandHandler(DeleteEpisodeCommand)
export class DeleteProgramCommandHandler
  implements ICommandHandler<DeleteEpisodeCommand>
{
  constructor(readonly programRepo: EpisodeRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: DeleteEpisodeCommand) {
    await this.programRepo.delete(command.episodeId);
  }
}
