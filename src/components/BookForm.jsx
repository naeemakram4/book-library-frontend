import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/api';
import './BookForm.css';
import { useNotification } from '../context/NotificationContext';

const BookForm = ({ bookId = null }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication_year: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // If bookId is provided, fetch the book data
  useEffect(() => {
    const fetchBook = async () => {
      if (bookId) {
        try {
          setLoading(true);
          const book = await bookService.getBookById(bookId);
          setFormData({
            title: book.title,
            author: book.author,
            publication_year: book.publication_year
          });
        } catch (error) {
          setSubmitError('Failed to fetch book details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBook();
  }, [bookId]);

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.publication_year) {
      newErrors.publication_year = 'Publication year is required';
    } else {
      const year = parseInt(formData.publication_year);
      if (isNaN(year) || year < 1500 || year > currentYear) {
        newErrors.publication_year = `Publication year must be between 1500 and ${currentYear}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      if (bookId) {
        await bookService.updateBook(bookId, formData);
        showNotification('Book updated successfully!');
      } else {
        await bookService.createBook(formData);
        showNotification('Book added successfully!');
      }
      navigate('/');
    } catch (error) {
      setSubmitError(error.message);
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && bookId) {
    return <div className="loading">Loading book details...</div>;
  }

  return (
    <div className="book-form">
      <h2>{bookId ? 'Edit Book' : 'Add New Book'}</h2>
      {submitError && <div className="error-message">{submitError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-text">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="publication_year">Publication Year:</label>
          <input
            type="number"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
            className={errors.publication_year ? 'error' : ''}
          />
          {errors.publication_year && (
            <span className="error-text">{errors.publication_year}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : bookId ? 'Update Book' : 'Add Book'}
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm; 