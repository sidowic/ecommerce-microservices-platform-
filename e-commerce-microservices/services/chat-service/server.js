const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8080'],
  credentials: true
}));

app.use(express.json());

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8080'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store active users and rooms
const activeUsers = new Map();
const chatRooms = new Map();
const messageHistory = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // User joins with their info
  socket.on('user:join', (userData) => {
    activeUsers.set(socket.id, {
      id: socket.id,
      userId: userData.userId,
      username: userData.username,
      role: userData.role || 'customer',
      joinedAt: new Date()
    });

    // Notify all clients about user list update
    io.emit('users:list', Array.from(activeUsers.values()));
    
    console.log(`👤 User ${userData.username} joined`);
  });

  // Join a chat room
  socket.on('room:join', (roomId) => {
    socket.join(roomId);
    
    if (!chatRooms.has(roomId)) {
      chatRooms.set(roomId, new Set());
    }
    chatRooms.get(roomId).add(socket.id);

    // Send message history for this room
    const history = messageHistory.get(roomId) || [];
    socket.emit('room:history', history);

    // Notify room members
    const roomUsers = Array.from(chatRooms.get(roomId))
      .map(id => activeUsers.get(id))
      .filter(Boolean);
    
    io.to(roomId).emit('room:users', roomUsers);
    
    console.log(`🏠 Socket ${socket.id} joined room ${roomId}`);
  });

  // Leave a chat room
  socket.on('room:leave', (roomId) => {
    socket.leave(roomId);
    
    if (chatRooms.has(roomId)) {
      chatRooms.get(roomId).delete(socket.id);
      
      const roomUsers = Array.from(chatRooms.get(roomId))
        .map(id => activeUsers.get(id))
        .filter(Boolean);
      
      io.to(roomId).emit('room:users', roomUsers);
    }
    
    console.log(`🚪 Socket ${socket.id} left room ${roomId}`);
  });

  // Send message
  socket.on('message:send', (data) => {
    const user = activeUsers.get(socket.id);
    
    if (!user) {
      socket.emit('error', { message: 'User not authenticated' });
      return;
    }

    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roomId: data.roomId,
      userId: user.userId,
      username: user.username,
      content: data.message,
      timestamp: new Date().toISOString()
    };

    // Store message in history (limit to last 100 messages per room)
    if (!messageHistory.has(data.roomId)) {
      messageHistory.set(data.roomId, []);
    }
    const history = messageHistory.get(data.roomId);
    history.push(message);
    if (history.length > 100) {
      history.shift(); // Remove oldest message
    }

    // Broadcast message to room
    io.to(data.roomId).emit('message:received', message);
    
    console.log(`💬 Message in room ${data.roomId} from ${user.username}`);
  });

  // Typing indicator
  socket.on('typing:start', (roomId) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      socket.to(roomId).emit('typing:user', {
        userId: user.userId,
        username: user.username,
        isTyping: true
      });
    }
  });

  socket.on('typing:stop', (roomId) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      socket.to(roomId).emit('typing:user', {
        userId: user.userId,
        username: user.username,
        isTyping: false
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove user from all rooms
    chatRooms.forEach((members, roomId) => {
      if (members.has(socket.id)) {
        members.delete(socket.id);
        
        const roomUsers = Array.from(members)
          .map(id => activeUsers.get(id))
          .filter(Boolean);
        
        io.to(roomId).emit('room:users', roomUsers);
      }
    });

    // Remove from active users
    activeUsers.delete(socket.id);
    
    // Update user list
    io.emit('users:list', Array.from(activeUsers.values()));
    
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// REST API endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'chat-service',
    activeUsers: activeUsers.size,
    activeRooms: chatRooms.size
  });
});

app.get('/api/stats', (req, res) => {
  res.json({
    activeUsers: activeUsers.size,
    activeRooms: chatRooms.size,
    totalMessages: Array.from(messageHistory.values())
      .reduce((sum, messages) => sum + messages.length, 0)
  });
});

app.get('/api/rooms/:roomId/messages', (req, res) => {
  const { roomId } = req.params;
  const messages = messageHistory.get(roomId) || [];
  
  res.json({
    roomId,
    messages,
    count: messages.length
  });
});

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
  console.log(`🚀 Chat Service running on port ${PORT}`);
  console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}`);
});
