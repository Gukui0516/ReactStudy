import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../Reducer/reducer";

export const store = configureStore({
    reducer: counterReducer,
});

//Redux state와 dispatch type 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;