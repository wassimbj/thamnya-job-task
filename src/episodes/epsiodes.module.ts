import { Module } from '@nestjs/common';
import { FileStorageModule } from 'src/shared/file-storage/file-storage.module';
import { CreateEpisodeCommandHandler } from './commands/create-episode/create-episode.command';
import { UpdateEpisodeCommandHandler } from './commands/update-episode/update-episode.command';
import { InternalEpisodeController } from './controllers/internal.episodes.controller';
import { PublicEpisodeController } from './controllers/public.episodes.controller';
import { EpisodeRepository } from './repositories/episode.repository';
import { PrismaEpisodeRepository } from './repositories/prisma-episode.repository';
import { GetEpisodesQueryHandler } from './queries/get-episodes/get-episodes.query';

const commands = [CreateEpisodeCommandHandler, UpdateEpisodeCommandHandler];
const queries = [GetEpisodesQueryHandler];

@Module({
  controllers: [InternalEpisodeController, PublicEpisodeController],
  providers: [
    {
      provide: EpisodeRepository,
      useClass: PrismaEpisodeRepository,
    },
    ...commands,
    ...queries,
  ],
  imports: [FileStorageModule],
})
export class EpisodesModule {}
