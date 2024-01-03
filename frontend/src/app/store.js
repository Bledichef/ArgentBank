import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logReducer from "../feature/log.slice";
import userReducer from "../feature/user.slice";

const store = configureStore({
  reducer: {
    log: logReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});
export default store;