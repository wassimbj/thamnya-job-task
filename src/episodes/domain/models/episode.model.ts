export interface EpisodeModel {
  id: string;
  title: string;
  description: string;
  media_url: string;
  thumbnail_url: string;
  program_id: string;
  episode_number: number;
  duration?: number;
  published_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}
