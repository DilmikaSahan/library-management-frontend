import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookService from '../services/bookService';
import type { CreateBookDTO } from '../types/Book';

export default function CreateBook() {
  const navigate = useNavigate();

  const handleCreate = async (data: CreateBookDTO) => {
    await BookService.createBook(data);
    navigate('/');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Create Book</h2>
      </div>
      <div className="page-content">
        <BookForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
