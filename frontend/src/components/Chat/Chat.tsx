import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  content: string;
  senderId: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const { data: session } = useSession();
  const { toast } = useToast();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      auth: { userId: session.user.id },
    });

    socketRef.current.on('connect_error', (error) => {
      toast({
        title: 'Connection Error',
        description: error.message,
        variant: 'destructive',
      });
    });

    socketRef.current.on('message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [session]);

  const joinRoom = () => {
    if (!roomId || !socketRef.current) return;
    socketRef.current.emit('joinRoom', roomId);
  };

  const sendMessage = () => {
    if (!message || !roomId || !socketRef.current) return;
    socketRef.current.emit('sendMessage', { roomId, content: message });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="flex-1 p-2 border rounded mr-2"
        />
        <button
          onClick={joinRoom}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Join Room
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded ${
              msg.senderId === session?.user?.id ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'
            }`}
          >
            <p>{msg.content}</p>
            <small className="text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
