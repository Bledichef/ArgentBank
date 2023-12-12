import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logReducer from "../feature/log.slice";
import userReducer from "../feature/user.slice";

export default configureStore({
    reducer: {
        log: logReducer,
        user: userReducer
    },
    middleware: [...getDefaultMiddleware()],
});