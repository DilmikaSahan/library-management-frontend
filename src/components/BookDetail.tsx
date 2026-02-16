import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookService from '../services/bookService';
import type { Book } from '../types/Book';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      BookService.getBookById(Number(id))
        .then(setBook)
        .catch(err => setError(err.message));
    }
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>
      <p><em>Created: {book.createdDate}</em></p>
      {book.updatedDate && <p><em>Updated: {book.updatedDate}</em></p>}
      <Link to="/">⬅ Back to List</Link>
      <Link to={`/edit/${book.id}`}>Edit</Link>
    </div>
  );
}
