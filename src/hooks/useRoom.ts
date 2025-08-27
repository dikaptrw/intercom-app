import { RoomContext } from '@/contexts/roomContext';
import { useContext } from 'react';

export const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error('RoomContext must be placed within RoomProvider');
  }

  return context;
};
