import { configureStore } from '@reduxjs/toolkit';

// Import the user reducer
import userReducer from './slices/userSlice';

// Import the API slices
import { userApi } from './apis/userApi';
import { transactionApi } from './apis/transactionApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, transactionApi.middleware),
});
