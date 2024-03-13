# Real-Time Chat Application

## Running the Server and Client Applications

1. Open a terminal and run the server:

2. Open another terminal and run the client:

## Architecture Overview

The server listens for incoming connections on a specified port. When a client connects, it's added to the list of connections. Messages received from one client are broadcasted to all connected clients, excluding the sender.

## Assumptions and Design Choices

- We're using a simple text-based interface for the client.
- Clients connect to the server via localhost.
- No external libraries or frameworks are used.
- Basic error handling is implemented.

## Accessing the Chat Application

Once the server is running, clients can connect to it using the provided IP address and port (localhost:3000).
