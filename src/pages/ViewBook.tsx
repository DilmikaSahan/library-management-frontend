import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookService from '../services/bookService';
import type { Book } from '../types/Book';

export default function ViewBook() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      BookService.getBookById(Number(id)).then(setBook);
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Book Details</h2>
      </div>
      <div className="page-content">
        <h3>{book.title}</h3>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        {book.description && <p>{book.description}</p>}
        <div className="book-detail-meta">
          <p>
            <em>Created: {book.createdDate}</em>
          </p>
          {book.updatedDate && (
            <p>
              <em>Updated: {book.updatedDate}</em>
            </p>
          )}
        </div>
        <div className="book-detail-actions">
          <Link to="/" className="btn btn-secondary">
            Back to List
          </Link>
          <Link to={`/edit/${book.id}`} className="btn">
            Edit Book
          </Link>
        </div>
      </div>
    </div>
  );
}
