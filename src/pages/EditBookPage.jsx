import React from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';

const EditBookPage = () => {
  const { id } = useParams();
  return <BookForm bookId={id} />;
};

export default EditBookPage; 