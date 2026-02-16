export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  createdDate: string;
  updatedDate: string | null;
}

export interface CreateBookDTO {
  title: string;
  author: string;
  description: string;
}

export interface UpdateBookDTO {
  title: string;
  author: string;
  description: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}