const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(cors());

// Set up SQLite database with Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

// Define the Cart model
const Cart = sequelize.define('Cart', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the database to create the Cart table
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// POST endpoint to handle data from the frontend (Add to Cart)
app.post('/addToCart', async (req, res) => {
  try {
    const productInfo = req.body;

    // Insert the product into the Cart table
    const cartItem = await Cart.create(productInfo);

    console.log('Product added to cart:', cartItem.toJSON());

    // Sending a simple response back to the frontend
    res.json({ status: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint to retrieve the contents of the cart
app.get('/getCart', async (req, res) => {
  try {
    // Retrieve all items from the Cart table
    const cartItems = await Cart.findAll();

    // Sending the cart items as JSON response
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint to handle data from the frontend (Remove from Cart)
app.post('/removeFromCart', async (req, res) => {
  try {
    const { id } = req.body;

    // Find the cart item by id and remove it
    const removedCartItem = await Cart.findByPk(id);
    if (removedCartItem) {
      await removedCartItem.destroy();
      console.log('Product removed from cart:', removedCartItem.toJSON());
      res.json({ status: 'Product removed from cart successfully' });
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
