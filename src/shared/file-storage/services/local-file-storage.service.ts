import { Injectable, Logger } from '@nestjs/common';
import { promises } from 'fs';
import { join } from 'path';
import { uuidv7 } from 'uuidv7';
import {
  FileStorage,
  FileUploadResult,
} from '../interfaces/file-storage.interface';
import { mkdir } from 'fs/promises';
import { FileStorageUtilsService } from '../utils/file-storage.utils';

@Injectable()
export class LocalFileStorageService implements FileStorage {
  constructor(readonly utils: FileStorageUtilsService) {}

  private uploadDir = 'uploads';
  private logger = new Logger('LocalFileStorageService');

  async onModuleInit() {
    try {
      await mkdir(this.uploadDir, { recursive: true });
      this.logger.debug(`Upload directory "${this.uploadDir}" is ready`);
    } catch (error) {
      this.logger.error('Error creating upload directory', error);
    }
  }

  async upload(file: Express.Multer.File): Promise<FileUploadResult> {
    const originalName = this.utils.cleanName(file.originalname);
    const fileName = `${uuidv7()}-${originalName}`;
    const filePath = join(this.uploadDir, fileName);

    if (!file.buffer) {
      throw new Error('File buffer is missing. Are you using memoryStorage?');
    }

    await promises.writeFile(filePath, file.buffer);

    return {
      originalName,
      path: filePath,
      size: file.size,
      uploadedFileName: fileName,
    };
  }
}
