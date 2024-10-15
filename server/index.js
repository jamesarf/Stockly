require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const verifyToken = require('./middleware/verifyToken');

const app = express();
const PORT = process.env.PORT || 5001;
const jwtSecret = process.env.JWT_SECRET;

connectDB();

// Imported routers
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');


// Routes
app.use(cors());
app.use(bodyParser.json());
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/subcategories', subCategoryRouter);
app.use('/inventories', inventoryRouter);
app.use('/uploads', express.static('uploads'));

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});


app.get('/', (req,res)=>{
  res.send(`Stockly server is running..`);
});


app.listen(PORT, () => {
  console.log(`Stockly server is running on port ${PORT}`);
});
