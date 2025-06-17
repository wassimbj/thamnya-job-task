import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProgramResponseDto } from './create-program-response.dto';
import { CreateProgramRequestDto } from './create-program-request.dto';
import { ProgramRepository } from 'src/programs/repositories/program.repository';
import { FileStorage } from 'src/shared/file-storage/interfaces/file-storage.interface';

export class CreateProgramCommand extends Command<CreateProgramResponseDto> {
  constructor(public readonly data: CreateProgramRequestDto) {
    super();
  }
}

@CommandHandler(CreateProgramCommand)
export class CreateProgramCommandHandler
  implements ICommandHandler<CreateProgramCommand>
{
  constructor(
    readonly programRepo: ProgramRepository,
    readonly fileStorage: FileStorage,
  ) {}

  async execute(command: CreateProgramCommand) {
    const image = await this.fileStorage.upload(command.data.image);

    const programId = await this.programRepo.create({
      type: command.data.type,
      description: command.data.description,
      language: command.data.language,
      image_url: image.path,
      slug: command.data.slug,
      title: command.data.title,
      author: command.data.author,
      published_at: command.data.isPublished ? new Date() : undefined,
    });

    return {
      programId,
    };
  }
}
