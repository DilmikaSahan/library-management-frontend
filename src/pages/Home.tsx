import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../services/bookService';
import type { Book } from '../types/Book';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    BookService.getAllBooks()
      .then(setBooks)
      .catch(err => setError(err.message));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await BookService.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Library</h1>
      <Link to="/create">Add New Book</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link> by {book.author}
            <button onClick={() => handleDelete(book.id)}>Delete</button>
            <Link to={`/edit/${book.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
