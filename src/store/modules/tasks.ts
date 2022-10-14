import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ICollaborator {
  avatar: string;
  name: string;
}

export interface ITask {
  title: string;
  collaborators: ICollaborator[];
  startDate: string;
  endDate: string;
  hoursBudgeted: string;
}

export interface ITaskState {
  all_collaborators: ICollaborator[];
  tasks: ITask[];
}

const initialState: ITaskState = {
  tasks: [
    {
      title: "User journey of the project",
      collaborators: [],
      startDate: "01/January/2022",
      endDate: "31/January/2022",
      hoursBudgeted: "80"
    },
    {
      title: "Wireframming the project",
      collaborators: [],
      startDate: "01/February/2022",
      endDate: "28/February/2022",
      hoursBudgeted: "80"
    },
    {
      title: "User interface design",
      collaborators: [],
      startDate: "01/March/2022",
      endDate: "31/March/2022",
      hoursBudgeted: "80"
    }
  ],
  all_collaborators: [
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Angela.svg",
      name: "Angela"
    },
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Chris.svg",
      name: "Chris"
    },
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Kelvin.svg",
      name: "Kelvin"
    },
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Teni.svg",
      name: "Teni"
    },
    {
      avatar: "https://avatars.dicebear.com/api/adventurer/Ola.svg",
      name: "Ola"
    }
  ]
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    add: (state: ITaskState, action: PayloadAction<ITask>) => {
      state.tasks.unshift(action.payload);
    }
  }
});

export const { add } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCollaborators = (state: RootState) =>
  state.tasks.all_collaborators;

export default taskSlice.reducer;
