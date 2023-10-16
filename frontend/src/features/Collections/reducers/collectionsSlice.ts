import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection } from '../../../types/Collection';

export interface CollectionsState {
  icons: string[],
  collections: Collection[],
}

const initialState: CollectionsState = {
  icons: ['home', 'people', 'work', 'groceries', 'car', 'star', 'vacation', 'graduate', 'medal', 'workout', 'love', 'gift'],
  collections: [{
    title: 'Home',
    iconName: 'home',
    color: '#ff758f',
    id: '0',
    userId: '0',
  }],
};

type UpdateTitle = {
  id: string,
  title: string,
}

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addCollection: (state: CollectionsState, action: PayloadAction<Collection>) => {
      state.collections.push(action.payload);
    },
    changeCollection: (state: CollectionsState, action: PayloadAction<UpdateTitle>) => {
     state.collections.filter(collection => collection.id === action.payload.id)[0].title = action.payload.title;
    },
    deleteCollection: (state: CollectionsState, action: PayloadAction<Collection>) => {
      state.collections = state.collections.filter(collection => collection.id !== action.payload.id);
    },
  }
});

export const {
  addCollection,
  deleteCollection,
  changeCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
