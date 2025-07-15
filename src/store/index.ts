import { configureStore } from '@reduxjs/toolkit';
import Slice from './Slice';
import { ocrApi } from './ocrApi';
import { purposeApi } from './purposeApi';
import { carApi } from './carApi';
import { calculateApi } from './calculateApi';
import { countriesApi } from './countriesApi';

const store = configureStore({
  reducer: {
    Slice: Slice,
    [ocrApi.reducerPath]: ocrApi.reducer,
    [purposeApi.reducerPath]: purposeApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [calculateApi.reducerPath]: calculateApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer
    // [authApi.reducerPath]: authApi.reducer,
    // [buhgalteriaApi.reducerPath]: buhgalteriaApi.reducer,
    // [customerApi.reducerPath]: customerApi.reducer,
    // [docsApi.reducerPath]: docsApi.reducer,
    // [filefolderApi.reducerPath]: filefolderApi.reducer,
    // [objectApi.reducerPath]: objectApi.reducer,
    // [refusalApi.reducerPath]: refusalApi.reducer,
    // [tyApi.reducerPath]: tyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ocrApi.middleware,
      purposeApi.middleware,
      carApi.middleware,
      calculateApi.middleware,
      countriesApi.middleware
      // authApi.middleware,
      // buhgalteriaApi.middleware,
      // customerApi.middleware,
      // docsApi.middleware,
      // filefolderApi.middleware,
      // objectApi.middleware,
      // refusalApi.middleware,
      // tyApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;
