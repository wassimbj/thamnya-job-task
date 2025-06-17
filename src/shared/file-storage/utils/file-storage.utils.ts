import { Injectable } from '@nestjs/common';

@Injectable()
export class FileStorageUtilsService {
  cleanName(name: string) {
    return name.trim().toLowerCase().replaceAll(' ', '-');
  }
}
