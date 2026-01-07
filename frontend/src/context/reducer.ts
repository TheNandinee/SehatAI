import { SehatAIResponse, ChatMessage, UserProfile } from "../types";

export interface AppState {
  user: UserProfile | null;
  currentView: string;
  diagnoses: SehatAIResponse[];
  currentDiagnosis: SehatAIResponse | null;
  chatHistory: ChatMessage[];
  initialChatQuery?: string;
}

export const initialState: AppState = {
  user: null,
  currentView: "auth",
  diagnoses: [],
  currentDiagnosis: null,
  chatHistory: []
};

export function reducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, currentView: "dashboard" };
    case "LOGOUT":
      return initialState;
    case "SET_VIEW":
      return { ...state, currentView: action.payload };
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        diagnoses: [action.payload, ...state.diagnoses],
        currentDiagnosis: action.payload
      };
    case "ADD_MESSAGE":
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case "SET_INITIAL_QUERY":
      return { ...state, initialChatQuery: action.payload };
    default:
      return state;
  }
}
