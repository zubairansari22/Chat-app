// server.js

const net = require("net");

const PORT = 3000;
const connections = [];

const server = net.createServer((socket) => {
  console.log("Client connected");

  // Store the new client socket
  connections.push(socket);

  // Event listener for receiving data from clients
  socket.on("data", (data) => {
    const message = data.toString().trim(); // Convert buffer to string and trim whitespace
    console.log(`Received from client: ${message}`);

    // Broadcast the received message to all other clients
    broadcastMessage(message, socket);
  });

  // Event listener for client disconnection
  socket.on("end", () => {
    console.log("Client disconnected");
    removeSocket(socket);
  });

  // Event listener for socket errors
  socket.on("error", (err) => {
    console.error("Socket error:", err);
    removeSocket(socket);
  });
});

// Function to broadcast a message to all clients except the sender
function broadcastMessage(message, sender) {
  connections.forEach((clientSocket) => {
    if (clientSocket !== sender) {
      clientSocket.write(`Client: ${message}`);
      console.log(`Broadcasted to client: ${message}`);
    }
  });
}

// Function to remove a disconnected socket from the connections array
function removeSocket(socket) {
  const index = connections.indexOf(socket);
  if (index !== -1) {
    connections.splice(index, 1);
  }
}

// Start the server and listen for incoming connections
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
