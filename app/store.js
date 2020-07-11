import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import ordersSlice from "../features/orders/ordersSlice";

import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  orders: ordersSlice,
});

export const store = configureStore({
  // reducer: persistReducer(persistConfig, rootReducer),
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

// export const persistor = persistStore(store);
// persistor.purge();
