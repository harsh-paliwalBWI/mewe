"use client";
import { createContext, useContext, useReducer } from "react";
import { auth, db } from "@/config/firebase-config";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const currentUser = auth.currentUser;
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId: action.payload.id,
        };

      case "RESET_STATE":
        return INITIAL_STATE;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
