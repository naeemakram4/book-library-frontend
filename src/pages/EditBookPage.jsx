import React from 'react';
import { useParams } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams();

  return (
    <div className="edit-book-page">
      <h2>Edit Book</h2>
      {/* We'll implement the edit form later */}
      <p>Editing book ID: {id}</p>
    </div>
  );
};

export default EditBookPage; 