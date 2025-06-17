import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EpisodesModule } from './episodes/epsiodes.module';
import { ProgramsModule } from './programs/programs.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    DatabaseModule,
    ProgramsModule,
    EpisodesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
