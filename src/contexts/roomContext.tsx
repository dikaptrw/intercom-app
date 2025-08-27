import { createContext, useState } from 'react';

interface RoomContextType {
  sideMenu?: 'chat' | 'info' | 'participants';
  setSideMenu: React.Dispatch<
    React.SetStateAction<RoomContextType['sideMenu'] | undefined>
  >;
}

export const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps {
  children?: React.ReactNode;
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [sideMenu, setSideMenu] = useState<RoomContextType['sideMenu']>();

  return (
    <RoomContext.Provider
      value={{
        sideMenu,
        setSideMenu,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
