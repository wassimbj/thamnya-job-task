export abstract class FileStorage {
  abstract upload(file: Express.Multer.File): Promise<FileUploadResult>;
}

export type FileUploadResult = {
  uploadedFileName: string;
  originalName: string;
  path: string;
  size: number;
};
