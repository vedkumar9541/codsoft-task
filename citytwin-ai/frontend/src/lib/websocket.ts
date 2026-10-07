'use client';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore, useCityStore } from './store';

const WS_URL = 'http://localhost:3001';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const token = useAuthStore((state) => state.token);
  const setCityData = useCityStore((state) => state.setCityData);

  useEffect(() => {
    if (!token) return;

    const socket = io(WS_URL, {
      auth: { token },
      reconnection: true,
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WS');
    });

    socket.on('cityUpdate', (data) => {
      setCityData(data);
    });

    socket.on('alert', (alertData) => {
      setCityData({ alerts: [alertData] }); // Append in real app
    });

    return () => {
      socket.disconnect();
    };
  }, [token, setCityData]);

  return socketRef.current;
};
