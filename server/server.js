const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");
const chatController = require("./controllers/conversationController");

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow requests from any origin
  },
});

// Set up Socket.io event handling through the chat controller
chatController.sendMessage(io);

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
