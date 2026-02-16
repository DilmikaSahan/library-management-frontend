import { useState } from 'react';
import type { CreateBookDTO, UpdateBookDTO } from '../types/Book';

interface Props {
  initialData?: UpdateBookDTO;
  onSubmit: (data: CreateBookDTO | UpdateBookDTO) => void;
}

export default function BookForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [author, setAuthor] = useState(initialData?.author || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<{ title?: string; author?: string; description?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { title?: string; author?: string; description?: string } = {};

    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedDescription = description.trim();

    // Title: required, 1-200 chars
    if (!trimmedTitle) {
      nextErrors.title = 'Title is required';
    } else if (trimmedTitle.length > 200) {
      nextErrors.title = 'Title must be 200 characters or less';
    }

    // Author: required, 1-100 chars
    if (!trimmedAuthor) {
      nextErrors.author = 'Author is required';
    } else if (trimmedAuthor.length > 100) {
      nextErrors.author = 'Author must be 100 characters or less';
    }

    // Description: optional, max 1000 chars
    if (trimmedDescription.length > 1000) {
      nextErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({ title: trimmedTitle, author: trimmedAuthor, description: trimmedDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="form-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter book title"
          required
          maxLength={200}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="author">
          Author
        </label>
        <input
          id="author"
          className="form-input"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Enter author name"
          required
          maxLength={100}
        />
        {errors.author && <span className="form-error">{errors.author}</span>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="form-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Optional description"
          maxLength={1000}
        />
        {errors.description && (
          <span className="form-error">{errors.description}</span>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">
          Save
        </button>
      </div>
    </form>
  );
}
