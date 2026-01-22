export interface Project {
  slug: string;
  title: string;
  description: string;
  vimeoId: string;
  thumbnail: string;
  tags: string[];
  date: string;
  client?: string;
  role?: string;
}
