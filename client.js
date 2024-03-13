// client.js

const net = require("net");
const readline = require("readline");

const client = new net.Socket();

client.connect(3000, "localhost", () => {
  console.log("Connected to server");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask user to input messages
  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", (input) => {
    // Send user input to the server
    client.write(input);

    // Continue asking for input
    rl.prompt();
  });

  // Event listener for receiving data from the server
  client.on("data", (data) => {
    console.log("Received from server:", data.toString());
  });

  // Event listener for socket errors
  client.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

// Event listener for socket closure
client.on("close", () => {
  console.log("Connection closed");
});
