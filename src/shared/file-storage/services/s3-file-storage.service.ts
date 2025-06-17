import { Injectable, NotImplementedException } from '@nestjs/common';
import { FileStorage, FileUploadResult } from '../interfaces/file-storage.interface';

@Injectable()
export class S3FileStorageService implements FileStorage {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  upload(file: Express.Multer.File): Promise<FileUploadResult> {
    throw new NotImplementedException('S3 Upload method is not implemented');
  }
}
