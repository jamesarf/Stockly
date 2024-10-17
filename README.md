# Stockly - 
## Full Stack Inventory Management Application

Stockly is a full stack inventory management system that enables businesses to manage their products, categories, subcategories, and inventories. This project includes both backend and frontend, built with React and Node.js.

## Live Demo

You can check the live version of the project here:  
[Live Demo: Deployed via Render (For both backend and frontend)] (https://stockly.onrender.com/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Backend](#backend)
- [Frontend](#frontend)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Overview

Stockly is designed to simplify inventory management tasks like adding products, managing categories, viewing inventory, and handling authentication. It allows users to monitor stock levels, track expiring products, and get low stock alerts.

## Features

- **User Authentication**: Secure user registration and login with JWT.
- **Dashboard**: Displays important inventory metrics like total products, expiring products, and low stock alerts.
- **Product Management**: CRUD operations for products with support for images, categories, subcategories, and inventory management.
- **Category Management**: Manage categories and subcategories.
- **Inventory Management**: Track product quantities, expiration dates, and get low stock notifications.

## Installation

### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/jamesarf/Stockly.git
   cd Stockly/server
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   JWT_SECRET=<YOUR_SECRET>
   ```

4. Start the server:

   ```bash
   npm start
   ```

### Frontend

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/jamesarf/Stockly.git
   cd Stockly/client
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```env
   REACT_APP_API_URL=<YOUR_BACKEND_API_URL>
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Backend

The backend is built with Node.js, Express, and MongoDB. It provides endpoints for managing users, products, categories, subcategories, and inventories.

### Key Controllers:

- **RegisterController**: Handles user registration using bcrypt and JWT authentication.
- **LoginController**: Manages user login and JWT token generation.
- **ProductController**: Handles product CRUD operations, including adding images, managing categories and subcategories.
- **CategoryController**: Handles CRUD for categories and subcategories.
- **InventoryController**: Manages inventory, tracks product quantities, and provides expiring product notifications.

## Frontend

The frontend is built with React and includes features like product management, category management, and user authentication.

### Folder Structure:

```plaintext
Stockly/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── tailwind.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Dependencies

### Backend:
- bcrypt
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- multer

### Frontend:
- React
- React Router
- Axios
- Tailwind CSS

## Contributing

Contributions are welcome! If you have suggestions or want to add new features, feel free to create a pull request or raise an issue.

## License

This project is licensed under the ISC License.
