const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vetrivelanarasu:3Of2va3emhinNK8G@cluster1.deyusk9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Set up middleware
app.use(express.json());
app.use(cors());


// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Vetri Project');
});

const studentRoutes = require('./routes/Students');

// Use the student routes
app.use('/students', studentRoutes);

// Start the server
const port = 3100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
