export interface ProgramModel {
  id: string;
  title: string;
  image_url: string;
  slug: string;
  type: ProgramTypeEnum;
  platform?: ProgramPlatformEnum; // (Spotify, Google..) if it's imported
  language: ProgramLanguageEnum;
  episodes_count: number;
  author?: string;
  description: string;
  published_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export enum ProgramTypeEnum {
  Podcast = 'Podcast',
  Documentary = 'Documentary',
  //... add another category
}

export enum ProgramPlatformEnum {
  Apple = 'Apple',
  Google = 'Google',
  Spotify = 'Spotify',
  //... add another platforms
}

export enum ProgramLanguageEnum {
  Arabic = 'Arabic',
  English = 'English',
  //... add another language
}
