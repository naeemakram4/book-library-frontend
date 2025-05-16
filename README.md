# Book Library Management System

A full-stack web application for managing a book library, built with React and Laravel. This project demonstrates a modern web application with a React frontend and Laravel REST API backend.

## Features

- View list of all books
- View detailed information about each book
- Add new books to the library
- Edit existing book information
- Delete books from the library
- Responsive design
- Form validation
- Success/Error notifications
- Confirmation dialogs for delete operations

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- CSS for styling

### Backend
- Laravel 12
- RESTful API
- MySQL Database

## Prerequisites

- Node.js (v14 or higher)
- PHP 8.1 or higher
- Composer
- MySQL
- Herd (for local development)

## Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd book-library-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd ../book-library-api
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Configure your database in the `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=book_library
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run migrations:
```bash
php artisan migrate
```

7. Seed the database (optional):
```bash
php artisan db:seed
```

8. Start the Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://book-library-api.test`

## API Endpoints

- `GET    /api/books` - List all books
- `GET    /api/books/{id}` - Get a specific book
- `POST   /api/books` - Create a new book
- `PUT    /api/books/{id}` - Update a book
- `DELETE /api/books/{id}` - Delete a book

## Request/Response Format

### Create/Update Book Request
```json
{
    "title": "Book Title",
    "author": "Author Name",
    "publication_year": 2024
}
```

### Book Response
```json
{
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "publication_year": 2024,
    "created_at": "2024-03-16T12:00:00.000000Z",
    "updated_at": "2024-03-16T12:00:00.000000Z"
}
```

## Validation Rules

- Title: Required, string, max 255 characters
- Author: Required, string, max 255 characters
- Publication Year: Required, integer between 1500 and current year

## Project Structure

### Frontend
```
src/
├── components/         # Reusable UI components
│   ├── BookList.jsx
│   ├── BookForm.jsx
│   ├── BookDetails.jsx
│   ├── ConfirmationDialog.jsx
│   └── Notification.jsx
├── pages/             # Page components
│   ├── HomePage.jsx
│   ├── BookDetailsPage.jsx
│   ├── EditBookPage.jsx
│   └── CreateBookPage.jsx
├── services/          # API service
│   └── api.js
├── context/           # React context
│   └── NotificationContext.jsx
└── App.jsx
```

### Backend
```
app/
├── Http/
│   ├── Controllers/
│   │   └── BookController.php
│   └── Middleware/
├── Models/
│   └── Book.php
└── routes/
    └── api.php
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details