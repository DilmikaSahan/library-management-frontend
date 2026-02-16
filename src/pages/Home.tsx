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
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Books</h2>
        <div className="page-actions">
          <Link to="/create" className="btn">
            Add New Book
          </Link>
        </div>
      </div>

      <div className="page-content">
        {error && <p className="error-text">{error}</p>}
        {books.length === 0 ? (
          <p className="muted-text">No books found. Create your first book.</p>
        ) : (
          <table className="book-list">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th style={{ width: '1%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td className="book-list-title">
                    <Link to={`/book/${book.id}`}>{book.title}</Link>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <div className="book-list-actions">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/edit/${book.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
