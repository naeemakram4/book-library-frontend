import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="book-details-page">
      <h2>Book Details</h2>
      {/* We'll implement the details view later */}
      <p>Book ID: {id}</p>
    </div>
  );
};

export default BookDetailsPage; 