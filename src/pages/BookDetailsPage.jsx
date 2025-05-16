import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import ConfirmationDialog from '../components/ConfirmationDialog';
import './BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      await bookService.deleteBook(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="book-details">
      <div className="book-header">
        <h2>{book.title}</h2>
        <div className="book-actions">
          <button 
            className="edit-button"
            onClick={() => navigate(`/books/${id}/edit`)}
          >
            Edit
          </button>
          <button 
            className="delete-button"
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="book-info">
        <div className="info-group">
          <label>Author:</label>
          <span>{book.author}</span>
        </div>
        <div className="info-group">
          <label>Publication Year:</label>
          <span>{book.publication_year}</span>
        </div>
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to List
      </button>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
      />
    </div>
  );
};

export default BookDetailsPage; 