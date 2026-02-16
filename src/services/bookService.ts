import type { Book, CreateBookDTO, UpdateBookDTO } from '../types/Book';

const API_BASE_URL = 'https://localhost:7058/api';

class BookService {
  async getAllBooks(): Promise<Book[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Book not found');
        }
        throw new Error(`Failed to fetch book: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  }

  async createBook(book: CreateBookDTO): Promise<Book> {
    try {
      const response = await fetch(`${API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create book');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  async updateBook(id: number, book: UpdateBookDTO): Promise<Book> {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Book not found');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update book');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Book not found');
        }
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  }
}

export default new BookService();