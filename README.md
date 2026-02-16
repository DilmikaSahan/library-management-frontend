## Library Management Frontend (React + TypeScript + Vite)

Simple frontend for a Library Management API. It lists books, allows creating, editing and deleting them, and includes basic front‑end validation that mirrors the backend DTO rules.

---

## 1. Tech stack

- React 18 + TypeScript
- Vite (dev server & bundler)
- react-router-dom (routing)
- Fetch API for HTTP calls to the ASP.NET Core backend

---

## 2. Project structure

Key files and folders:

- index.html – Vite entry HTML.
- vite.config.ts – Vite configuration.
- tsconfig*.json – TypeScript configs.
- src/
  - main.tsx – React entry point.
  - App.tsx – App shell and route definitions.
  - App.css – Layout, page, form and button styles.
  - index.css – Global base styles.
  - components/
    - BookForm.tsx – Shared create/edit form with front‑end validation.
    - BookList.tsx – (optional) reusable list component (Home currently in pages).
    - BookDetail.tsx – (optional) reusable detail component.
  - pages/
    - Home.tsx – Shows table of books and actions.
    - CreateBook.tsx – Uses BookForm to create a new book.
    - EditBook.tsx – Uses BookForm to edit an existing book.
    - ViewBook.tsx – Shows details for a single book.
  - services/
    - bookService.ts – Wrapper around fetch for all /books API calls.
  - types/
    - Book.ts – Frontend TypeScript types (Book, CreateBookDTO, UpdateBookDTO).

---

## 3. Environment setup

### 3.1 Prerequisites

- Node.js 18+ and npm installed.
- .NET backend (LibraryManagementAPI) running locally (HTTPS) – for example at:
  - https://localhost:7058

### 3.2 Install dependencies

```bash
npm install
```

### 3.3 Configure API base URL

The frontend currently uses a constant in bookService:

- src/services/bookService.ts
  - `const API_BASE_URL = 'https://localhost:7058/api';`

If your backend runs on a different port or URL, update `API_BASE_URL` to match your environment.

### 3.4 Run the app

```bash
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

---

## 4. Data model and validation

### 4.1 Backend models (summary)

The backend defines the entity and DTOs with Data Annotations:

- Entity: `Book`
  - `Title`: `[Required]`, `[MaxLength(200)]`
  - `Author`: `[Required]`, `[MaxLength(100)]`
  - `Description`: `[MaxLength(1000)]`
  - `CreatedDate`: `[Required]`

- DTOs: `CreateBookDTO` and `UpdateBookDTO`
  - `Title`: `[Required]`, `[StringLength(200, MinimumLength = 1)]`
  - `Author`: `[Required]`, `[StringLength(100, MinimumLength = 1)]`
  - `Description`: `[StringLength(1000)]`

### 4.2 Frontend TypeScript models

In src/types/Book.ts:

- `Book` – matches BookResponseDTO from backend (Id, Title, Author, Description, CreatedDate, UpdatedDate).
- `CreateBookDTO` – used when creating a book (title, author, description).
- `UpdateBookDTO` – used when updating a book (title, author, description).

These DTO types are used by bookService and BookForm so the shape of data is consistent end‑to‑end.

### 4.3 Frontend validation (BookForm)

Frontend validation is implemented in a single place, in src/components/BookForm.tsx, and mirrors the backend DTO rules but stays simple and easy to explain.

**State:**

- Local state for field values: `title`, `author`, `description`.
- Local state for validation errors: `errors = { title?: string; author?: string; description?: string }`.

**On submit:**

1. The form submit handler prevents default browser submit: `e.preventDefault()`.
2. It trims values: `trimmedTitle`, `trimmedAuthor`, `trimmedDescription`.
3. Builds a `nextErrors` object:
   - Title:
     - If empty → `"Title is required"`.
     - If longer than 200 characters → `"Title must be 200 characters or less"`.
   - Author:
     - If empty → `"Author is required"`.
     - If longer than 100 characters → `"Author must be 100 characters or less"`.
   - Description:
     - If longer than 1000 characters → `"Description cannot exceed 1000 characters"`.
4. `setErrors(nextErrors)` is called.
5. If `nextErrors` has any keys, submit stops there (frontend shows the errors).
6. If there are no errors, `onSubmit` is called with trimmed values:
   - `{ title: trimmedTitle, author: trimmedAuthor, description: trimmedDescription }`.

**HTML attributes:**

- `required` on title and author inputs.
- `maxLength={200}` on title input.
- `maxLength={100}` on author input.
- `maxLength={1000}` on description textarea.

**Error display:**

- Under each field, the component conditionally renders an error message if present:
  - `errors.title && <span className="form-error">{errors.title}</span>`
  - `errors.author && <span className="form-error">{errors.author}</span>`
  - `errors.description && <span className="form-error">{errors.description}</span>`
- CSS class `.form-error` is defined in src/App.css to style these messages in small red text.

This approach keeps the validation logic straightforward and aligned with the backend, which is easy to walk through during an interview.

---

## 5. How the frontend talks to the backend

All API calls are centralized in src/services/bookService.ts:

- `getAllBooks()` – GET `/api/books`, returns `Book[]`.
- `getBookById(id)` – GET `/api/books/{id}`, returns `Book` (404 → "Book not found").
- `createBook(dto)` – POST `/api/books`, body is `CreateBookDTO`.
- `updateBook(id, dto)` – PUT `/api/books/{id}`, body is `UpdateBookDTO`.
- `deleteBook(id)` – DELETE `/api/books/{id}`.

Errors from the API are caught and re-thrown with simple `Error` messages, which pages like Home or EditBook display as basic text (for example using the `error-text` class).

---
