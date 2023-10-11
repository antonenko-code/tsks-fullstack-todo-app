import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/Task';

export interface TasksState {
  tasks: Task[],
}

const initialState: TasksState = {
  tasks: [],
}

type UpdateStatus = {
  id: string,
  newStatus: boolean,
}

type UpdateTitle = {
  id: string,
  newTitle: string,
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state: TasksState, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },

    changeStatus: (state: TasksState, action: PayloadAction<UpdateStatus>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.completed = action.payload.newStatus;
      }
    },

    changeTitle: (state: TasksState, action: PayloadAction<UpdateTitle>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.newTitle;
      }
    },

    deleteAllByCollectionId: (state: TasksState, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.collectionId !== action.payload)
    },

    deleteTask: (state: TasksState, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
  },
});

export const {
  add,
  changeStatus,
  changeTitle,
  deleteAllByCollectionId,
  deleteTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
