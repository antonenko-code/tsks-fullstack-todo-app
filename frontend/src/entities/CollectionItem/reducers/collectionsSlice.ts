import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection } from '../../../types/Collection';


export interface CollectionsState {
  icons: string[],
  colors: string[],
  collections: Collection[],
}

const initialState: CollectionsState = {
  icons: ['home', 'people', 'work', 'groceries', 'car', 'star', 'vacation', 'graduate', 'medal', 'workout', 'love', 'gift'],
  colors: ['#f4d35e', '#aeb8fe', '#83c5be', '#ff36ab', '#ee9b00', '#3a86ff', '#ef233c', '#80ed99', '#9b5de5', '#15616d', '#f75c03'],
  collections: [{
    title: 'Home',
    iconName: 'home',
    color: '#ff758f',
    id: '0',
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
    deleteColor: (state: CollectionsState, action: PayloadAction<number>) => {
      state.colors.splice(action.payload, 1);
    },
    addCollection: (state: CollectionsState, action: PayloadAction<Collection>) => {
      state.collections.push(action.payload);
    },
    changeCollection: (state: CollectionsState, action: PayloadAction<UpdateTitle>) => {
     state.collections.filter(collection => collection.id === action.payload.id)[0].title = action.payload.title;
    },
    deleteCollection: (state: CollectionsState, action: PayloadAction<Collection>) => {
      if (!state.colors.includes(action.payload.color)) {
        state.colors.push(action.payload.color);
      }
      state.collections = state.collections.filter(collection => collection.id !== action.payload.id);
    },
  }
});

export const { deleteColor, addCollection, deleteCollection, changeCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
