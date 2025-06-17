import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProgramInput } from 'src/programs/repositories/program.interface';
import { ProgramRepository } from 'src/programs/repositories/program.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';
import { UpdateProgramRequestDto } from './update-program-request.dto';

export class UpdateProgramCommand extends Command<void> {
  constructor(
    public readonly programId: string,
    public readonly data: UpdateProgramRequestDto,
  ) {
    super();
  }
}

@CommandHandler(UpdateProgramCommand)
export class UpdateProgramCommandHandler
  implements ICommandHandler<UpdateProgramCommand>
{
  constructor(
    readonly programRepo: ProgramRepository,
    readonly fileStorage: FileStorage,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: UpdateProgramCommand) {
    const { image, isPublished, ...other } = command.data;

    // console.log(command.data);
    const data: UpdateProgramInput = {
      ...other,
      published_at: isPublished ? new Date() : null,
    };

    if (image) {
      const uploadedFile = await this.fileStorage.upload(image);
      data.image_url = uploadedFile.path;
    }

    await this.programRepo.update(command.programId, data);
  }
}
