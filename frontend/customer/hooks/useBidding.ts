import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface BiddingSession {
  id: number;
  menu: any;
  timeRemaining: number;
  currentBids: any[];
  savings: number;
}

export function useBidding() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeSessions, setActiveSessions] = useState<BiddingSession[]>([]);
  const [joinedSessions, setJoinedSessions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000', {
      path: '/socket.io',
      transports: ['websocket']
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to bidding socket');
    });

    newSocket.on('new-session', (session: BiddingSession) => {
      setActiveSessions(prev => [...prev, session]);
    });

    newSocket.on('session-update', (session: BiddingSession) => {
      setActiveSessions(prev => 
        prev.map(s => s.id === session.id ? session : s)
      );
    });

    newSocket.on('session-ended', (sessionId: number) => {
      setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const joinSession = (sessionId: number) => {
    if (socket && !joinedSessions.has(sessionId)) {
      socket.emit('join-session', sessionId);
      setJoinedSessions(prev => new Set(prev).add(sessionId));
    }
  };

  const placeBid = (sessionId: number, amount: number) => {
    if (socket) {
      socket.emit('place-bid', {
        sessionId,
        userId: 1, // TODO: Get from auth context
        amount
      });
    }
  };

  const leaveSession = (sessionId: number) => {
    if (socket && joinedSessions.has(sessionId)) {
      socket.emit('leave-session', sessionId);
      setJoinedSessions(prev => {
        const newSet = new Set(prev);
        newSet.delete(sessionId);
        return newSet;
      });
    }
  };

  return {
    activeSessions,
    joinedSessions,
    joinSession,
    placeBid,
    leaveSession
  };
} 