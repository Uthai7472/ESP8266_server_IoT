const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

// Express server setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(bodyParser.json());
const port = 3000; // Public server port

let lastRandomValue = null;

// Listen for Socket.IO connections from local servers
io.on('connection', (socket) => {
  console.log('Local server connected via Socket.IO');

  // Listen for randomData events from the local server
  socket.on('randomData', (data) => {
    console.log('Received random value via Socket.IO:', data.value);
    lastRandomValue = data.value;
    // Optionally broadcast to all connected clients
    io.emit('randomValue', data.value);
  });

  socket.on('disconnect', () => {
    console.log('Local server disconnected via Socket.IO');
  });
});

app.get('/', (req, res) => {
    res.send(`Value from Raspberry PI: ${lastRandomValue}`);
})

// Example GET route
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Public server is running', status: 'active' });
// });

// // Example POST route
// app.post('/api/receive', (req, res) => {
//   const { value } = req.body;
//   console.log('Received POST data:', value);

//   // Broadcast the received data via Socket.IO
//   io.emit('newData', value);
//   res.json({ message: 'Data broadcasted to clients', value });
// });

// Start the public Express server
server.listen(port, () => {
  console.log(`Public server is running on http://localhost:${port}`);
});
