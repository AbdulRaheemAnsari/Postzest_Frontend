export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  columnId: string;
  tagIds?: string[];
  imageUrl?: string;
  fileName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  order: number;
}

export interface IdeaBoard {
  columns: Column[];
  ideas: Idea[];
  tags: Tag[];
}
