require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Imported routers
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');


// Routes
app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/subcategories', subCategoryRouter);
app.use('/inventories', inventoryRouter);
app.use('/uploads', express.static('uploads'));


app.get('/', (req,res)=>{
  res.send("Product Management Application is Running..");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
