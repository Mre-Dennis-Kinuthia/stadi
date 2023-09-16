const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Replace 'COM3' with your Arduino's serial port
const port = new SerialPort('COM3', { baudRate: 9600 });

// Create a parser to read lines from the Arduino
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for data from the Arduino
  parser.on('data', (data) => {
    // Send the received data to the connected clients
    socket.emit('arduinoData', data);
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3000
http.listen(3000, () => {
  console.log('Server is running on http://localhost:3500');
});
