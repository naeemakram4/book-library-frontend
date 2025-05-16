import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import ConfirmationDialog from './ConfirmationDialog';
import './BookList.css';
import { useNotification } from '../context/NotificationContext';

const BookList = () => {
  const navigate = useNavigate();
  const { books, loading, error, deleteBook } = useBooks();
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, bookId: null });
  const { showNotification } = useNotification();

  const handleDeleteClick = (id) => {
    setDeleteDialog({ isOpen: true, bookId: id });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBook(deleteDialog.bookId);
      setDeleteDialog({ isOpen: false, bookId: null });
      showNotification('Book deleted successfully!');
    } catch (err) {
      showNotification('Failed to delete book', 'error');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="book-list">
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publication_year}</td>
              <td>
                <button onClick={() => navigate(`/books/${book.id}`)}>
                  View
                </button>
                <button onClick={() => navigate(`/books/${book.id}/edit`)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, bookId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
      />
    </div>
  );
};

export default BookList; 