import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IMessageTile {
  avatar: string;
  name: string;
  message: string;
  id: number;
}

export interface IMessageState {
  messages: IMessageTile[];
}

const initialState: IMessageState = {
  messages: [
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Chris.svg",
      name: "Chris Webber",
      message: "Hi Michael. How are you doing?",
      id: 1
    },
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Kelvin.svg",
      name: "Kelvin Durant",
      message: "Do you need that design?",
      id: 2
    }
  ]
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {}
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMessages = (state: RootState) => state.messages.messages;

export default messageSlice.reducer;
