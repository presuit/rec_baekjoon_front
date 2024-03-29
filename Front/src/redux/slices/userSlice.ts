import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, ProblemMetadata } from "../state";

interface addUserNameAction {
  userName: string;
  isHistory: boolean;
}

const userSlice = createSlice({
  name: "USER",
  initialState: {
    favoriteUserNames: [],
    historyUserNames: [],
    currentUserName: undefined,
    recommendProblemsOfCurrentUser: [],
  } as UserState,
  reducers: {
    addUserName: {
      reducer: (state, action: PayloadAction<addUserNameAction>) => {
        if (action.payload.isHistory) {
          const historyUserNames = [...state.historyUserNames];
          if (!historyUserNames.includes(action.payload.userName)) {
            historyUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            historyUserNames: historyUserNames,
          };
        } else {
          const favoriteUserNames = [...state.favoriteUserNames];
          if (!favoriteUserNames.includes(action.payload.userName)) {
            favoriteUserNames.push(action.payload.userName);
          }
          return {
            ...state,
            favoriteUserNames: favoriteUserNames,
          };
        }
      },
      prepare: (userName: string, isHistory: boolean) => {
        return { payload: { userName, isHistory } };
      },
    },
    setCurrentUserName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentUserName: action.payload,
      };
    },
    setRecommendProblemMetadatas: (
      state,
      action: PayloadAction<ProblemMetadata[]>
    ) => {
      return {
        ...state,
        recommendProblemsOfCurrentUser: [...action.payload],
      };
    },
  },
});

export const { addUserName, setCurrentUserName, setRecommendProblemMetadatas } =
  userSlice.actions;
export default userSlice.reducer;
