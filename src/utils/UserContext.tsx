import { createContext, useContext } from "react";

export const UserContext = createContext({});

export function getUserData() {
  const context = useContext(UserContext);
  if (!context) return {};
  return context;
}
