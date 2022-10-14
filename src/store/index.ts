import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tasks from "./modules/tasks";
import messages from "./modules/messages";

export const store = configureStore({
  reducer: {
    tasks,
    messages
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
