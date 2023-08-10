import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CollectionsState {
  colors: string[],
}

const initialState: CollectionsState = {
  colors: ['#f4d35e', '#aeb8fe', '#28afb0', '#ff36ab', '#ee964b'],
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    deleteColor: (state, action: PayloadAction<number>) => {
      state.colors.splice(1, action.payload)
    },
  },
});

export const { deleteColor } = collectionsSlice.actions;

export default collectionsSlice.reducer;
