import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './slices/usuariosSlice';
import funcionariosReducer from './slices/funcionariosSlice';
import empresasReducer from './slices/empresasSlice';

export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    funcionarios: funcionariosReducer,
    empresas: empresasReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
