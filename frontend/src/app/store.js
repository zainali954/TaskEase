import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { setupInterceptors } from '../services/apiClient';
import toastMiddleware from '../utils/toastMiddleware';
import redirectionMiddleware from '../utils/redirectionMiddleware';
import taskReducer from './slices/taskSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware, redirectionMiddleware),
})

setupInterceptors(store);

export default store