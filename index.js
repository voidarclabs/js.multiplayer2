const express = require('express');
const app = express();
const path = require('path');

// Serve the index.html file when the root path is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
app.listen(100, () => {
  console.log('Server listening on port 100');
});