import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './slices/usuariosSlice';
import funcionariosReducer from './slices/funcionariosSlice';
import empresasReducer from './slices/empresasSlice';
import avaliacoesReducer from './slices/avaliacoesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    usuarios: usuariosReducer,
    funcionarios: funcionariosReducer,
    empresas: empresasReducer,
    avaliacoes: avaliacoesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
