import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://naeem-codes.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle Laravel-specific responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw new Error('Unable to connect to the server. Please make sure the API server is running.');
    }
    
    // Handle Laravel validation errors
    if (error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      const errorMessage = Object.values(validationErrors)
        .flat()
        .join(', ');
      throw new Error(errorMessage);
    }

    // Handle 404 errors
    if (error.response.status === 404) {
      throw new Error('Book not found');
    }

    throw error;
  }
);

// API functions for books
export const bookService = {
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await api.get('/api/books');
      return response.data;
    } catch (error) {
      console.error('Get All Books Error:', error);
      throw new Error(error.message || 'Failed to fetch books');
    }
  },

  // Get a single book by ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get Book By ID Error:', error);
      throw new Error(error.message || 'Failed to fetch book');
    }
  },

  // Create a new book
  createBook: async (bookData) => {
    try {
      const response = await api.post('/api/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Create Book Error:', error);
      throw new Error(error.message || 'Failed to create book');
    }
  },

  // Update a book
  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/api/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      console.error('Update Book Error:', error);
      throw new Error(error.message || 'Failed to update book');
    }
  },

  // Delete a book
  deleteBook: async (id) => {
    try {
      await api.delete(`/api/books/${id}`);
      return true;
    } catch (error) {
      console.error('Delete Book Error:', error);
      throw new Error(error.message || 'Failed to delete book');
    }
  },
};

export default api; 