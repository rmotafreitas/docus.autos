import { createContext } from "react";

export const UserIdContext: any = createContext("");

export interface UserIdContextProps {
  userId: string;
  setUserId: (userId: string) => void;
}
