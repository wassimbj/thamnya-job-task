import { Global, Module } from '@nestjs/common';
import { FileStorage } from './interfaces/file-storage.interface';
import { LocalFileStorageService } from './services/local-file-storage.service';
import { FileStorageUtilsService } from './utils/file-storage.utils';

@Global()
@Module({
  providers: [
    FileStorageUtilsService,
    {
      provide: FileStorage,
      useClass: LocalFileStorageService,
    },
  ],
  exports: [
    {
      provide: FileStorage,
      useClass: LocalFileStorageService,
    },
  ],
})
export class FileStorageModule {}
