export interface News {
  id: number;
  name: string;
  index: number;
  poster: string;
  description: string | null;
  tags: string[];
  school_ids: number[];
}
