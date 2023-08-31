import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice'
import collectionsReducer from '../features/Collections/reducers/collectionsSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
}

const rootReducer = combineReducers({
  collections: collectionsReducer,
  todos: todosReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
/* eslint-enable @typescript-eslint/indent */
