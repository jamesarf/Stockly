# Stockly

Stockly is a web application designed for managing inventory and products efficiently. It features a backend built with Node.js and Express, and a frontend created with React. This application provides functionalities for product and inventory management, making it ideal for e-commerce and retail businesses.

## Features

- **Product Management**: Add, update, retrieve, and delete products.
- **Inventory Management**: Manage inventory for each product, including expiration dates and quantities.
- **User-Friendly Interface**: A responsive and interactive frontend built with React, styled using Tailwind CSS.

## Technologies Used

- **Frontend**: 
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend**: 
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/Stockly.git
   ```

2. **Navigate to the server directory**:

   ```bash
   cd Stockly-server
   ```

3. **Install the backend dependencies**:

   ```bash
   npm install
   ```

4. **Set up your environment variables** in a `.env` file in the server directory:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   PORT=your_preferred_port
   ```

5. **Start the backend server**:

   ```bash
   npm start
   ```

6. **Navigate to the client directory**:

   ```bash
   cd ../Stockly-client
   ```

7. **Install the frontend dependencies**:

   ```bash
   npm install
   ```

8. **Start the frontend application**:

   ```bash
   npm start
   ```

### Usage

Once both the frontend and backend servers are running, you can access the application by navigating to `http://localhost:your_frontend_port` in your web browser. You will be able to manage products and inventory through the user interface.

### API Endpoints

#### Products

- **GET** `/api/products` - Retrieve all products
- **POST** `/api/products` - Add a new product
- **GET** `/api/products/:id` - Get a product by ID
- **PUT** `/api/products/:id` - Update a product by ID
- **DELETE** `/api/products/:id` - Delete a product by ID

#### Inventory

- **GET** `/api/inventory` - Retrieve all inventory items
- **POST** `/api/inventory` - Add a new inventory item
- **PUT** `/api/inventory/:id` - Update an inventory item by ID
- **DELETE** `/api/inventory/:id` - Delete an inventory item by ID

### Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to create a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Thanks to the contributors and resources that helped in the development of this project.

### Contact

For any inquiries, please reach out to [your email or contact information].
