// node_modules
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
// services
import { courseApi } from "./services/course.service";

const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;
