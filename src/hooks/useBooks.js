import { useState, useEffect } from 'react';
import { bookService } from '../services/api';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    try {
      const newBook = await bookService.createBook(bookData);
      setBooks(prevBooks => [...prevBooks, newBook]);
      return newBook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const updatedBook = await bookService.updateBook(id, bookData);
      setBooks(prevBooks => 
        prevBooks.map(book => book.id === id ? updatedBook : book)
      );
      return updatedBook;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook
  };
}; 