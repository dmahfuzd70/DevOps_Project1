const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data (replace with a database)
let items = [];

// Routes

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Read a single item by ID
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

// Update an existing item by ID
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[index] = updatedItem;
  res.json(updatedItem);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});