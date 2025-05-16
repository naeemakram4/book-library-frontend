import React from 'react';
import BookList from '../components/BookList';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Library Management System</h1>
      <BookList />
    </div>
  );
};

export default HomePage; 