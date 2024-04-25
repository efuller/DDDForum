import React, { createContext, useContext, useState } from "react";

export interface UserData {
  id?: number
  userName: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

const UserContext = createContext<{
  user: UserData,
  setUser: React.Dispatch<React.SetStateAction<UserData>>
}| null>(null);

export const useUserContext = () => {
 const currentUserContext = useContext(UserContext)
  if (!currentUserContext) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return currentUserContext;
};

export function UserProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<UserData>({
    userName: '',
    email: '',
  });

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}