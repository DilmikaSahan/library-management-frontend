import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookService from '../services/bookService';
import type { UpdateBookDTO } from '../types/Book';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<UpdateBookDTO | null>(null);

  useEffect(() => {
    if (id) {
      BookService.getBookById(Number(id)).then(setBook);
    }
  }, [id]);

  const handleUpdate = async (data: UpdateBookDTO) => {
    await BookService.updateBook(Number(id), data);
    navigate('/');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Edit Book</h2>
      </div>
      <div className="page-content">
        {book && <BookForm initialData={book} onSubmit={handleUpdate} />}
      </div>
    </div>
  );
}
