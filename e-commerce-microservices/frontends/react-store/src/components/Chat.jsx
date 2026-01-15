import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

const socket = io('http://localhost:5003');

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const roomId = 'customer-support';

  useEffect(() => {
    if (isOpen) {
      socket.emit('user:join', {
        userId: Math.floor(Math.random() * 10000),
        username,
        role: 'customer'
      });

      socket.emit('room:join', roomId);

      socket.on('room:history', (history) => {
        setMessages(history);
      });

      socket.on('message:received', (message) => {
        setMessages(prev => [...prev, message]);
      });

      return () => {
        socket.emit('room:leave', roomId);
        socket.off('room:history');
        socket.off('message:received');
      };
    }
  }, [isOpen, username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('message:send', {
        roomId,
        message: newMessage
      });
      setNewMessage('');
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <ChatBubbleLeftIcon className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Customer Support</h3>
            <p className="text-sm text-blue-100">We're here to help!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.username === username
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-xs font-semibold mb-1">{msg.username}</p>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
