import { FC, ReactNode, createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "./UserProvider";


const ConversationContext = createContext<any>(null);


export const ConversationProvider: FC<{children: ReactNode}> = ({children}) => {

   const {user, setUser }: any = useContext(AuthContext);
   const INITIAL_STATE = {
      chatId: "null",
      us: {}

   }
   const chatReducer = (state:any,action:any) => {
      switch (action.type) {
         case "CHANGE_USER":
            return {
               us:action.payload,
               chatId:  
               user.uid > action.payload.uid ? 
               user.uid + action.payload.uid 
               : action.payload.uid + user.uid
            };
         default:
            return state
      } 
   }
   const [state, dispatch]:any = useReducer<any>(chatReducer, INITIAL_STATE)
    return (
      <ConversationContext.Provider
      value={{data:state, dispatch}}
      >
         {children}
      </ConversationContext.Provider>
   )
}
export {ConversationContext}