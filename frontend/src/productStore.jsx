import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, productReducer);
const store= configureStore({

    reducer:{
        cartProduct:persistedReducer
    }
})
export const persistor = persistStore(store);
export default store;