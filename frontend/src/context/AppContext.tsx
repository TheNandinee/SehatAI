import React, { createContext, useReducer } from "react";
import { reducer, initialState, AppState } from "./reducer";

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({} as any);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
