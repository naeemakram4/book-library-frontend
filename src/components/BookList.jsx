import React, { useState, useEffect } from 'react';
import './BookList.css';

const BookList = () => {
  // State to store the list of books
  const [books, setBooks] = useState([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle any errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch books when component mounts
  useEffect(() => {
    // This is a placeholder for now - we'll implement the actual API call later
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch('http://localhost:8000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading books...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Show the list of books
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
                <button onClick={() => {/* TODO: Implement view details */}}>
                  View
                </button>
                <button onClick={() => {/* TODO: Implement edit */}}>
                  Edit
                </button>
                <button onClick={() => {/* TODO: Implement delete */}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList; 