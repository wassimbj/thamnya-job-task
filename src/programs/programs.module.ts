import { Module } from '@nestjs/common';
import { FileStorageModule } from 'src/shared/file-storage/file-storage.module';
import { InternalProgramController } from './controllers/internal.programs.controller';
import { PublicProgramController } from './controllers/public.programs.controller';
import { PrismaProgramRepository } from './repositories/prisma-program.repository';
import { ProgramRepository } from './repositories/program.repository';
import { CreateProgramCommandHandler } from './commands/create-program/create-program.command';
import { UpdateProgramCommandHandler } from './commands/update-program/update-program.command';
import { GetProgramsQueryHandler } from './queries/get-programs/get-programs.query';
import { DeleteProgramCommandHandler } from './commands/delete-program/delete-program.command';

const commands = [
  CreateProgramCommandHandler,
  UpdateProgramCommandHandler,
  DeleteProgramCommandHandler,
];
const queries = [GetProgramsQueryHandler];

@Module({
  controllers: [InternalProgramController, PublicProgramController],
  providers: [
    {
      provide: ProgramRepository,
      useClass: PrismaProgramRepository,
    },
    ...commands,
    ...queries,
  ],
  imports: [FileStorageModule],
})
export class ProgramsModule {}
