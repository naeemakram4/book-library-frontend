import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import EditBookPage from './pages/EditBookPage';
import CreateBookPage from './pages/CreateBookPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/books/create" className="nav-link">Add New Book</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/books/:id/edit" element={<EditBookPage />} />
            <Route path="/books/create" element={<CreateBookPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
