import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProgramRepository } from 'src/programs/repositories/program.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';

export class DeleteProgramCommand extends Command<void> {
  constructor(public readonly programId: string) {
    super();
  }
}

@CommandHandler(DeleteProgramCommand)
export class DeleteProgramCommandHandler
  implements ICommandHandler<DeleteProgramCommand>
{
  constructor(
    readonly programRepo: ProgramRepository,
    readonly fileStorage: FileStorage,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: DeleteProgramCommand) {
    await this.programRepo.delete(command.programId);
  }
}
