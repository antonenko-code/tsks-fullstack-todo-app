import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

export interface TodosState {
  todos: Todo[],
}

const initialState: TodosState = {
  todos: [],
}

type UpdateTitle = {
  id: string,
  newTitle: string,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state: TodosState, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    changeStatus: (state: TodosState, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    changeTitle: (state: TodosState, action: PayloadAction<UpdateTitle>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      if (todo) {
        todo.title = action.payload.newTitle;
      }
    },

    deleteAllByCollectionId: (state: TodosState, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.collectionId !== action.payload)
    },

    deleteTask: (state: TodosState, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
  },
});

export const {
  add,
  changeStatus,
  changeTitle,
  deleteAllByCollectionId,
  deleteTask,
} = todosSlice.actions;

export default todosSlice.reducer;
