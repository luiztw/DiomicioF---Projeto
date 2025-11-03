import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { funcionarioService } from '../../services/funcionarioService';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    permissions: string[];
  } | null;
  loading: boolean;
  error: string | null;
}

// Recuperar usuário do localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('isAuthenticated'),
  currentUser: getUserFromStorage(),
  loading: false,
  error: null,
};

// Async Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Buscar todos os funcionários
      const funcionarios = await funcionarioService.getAll();

      // Procurar funcionário com email e senha correspondentes
      const funcionario = funcionarios.find(
        f => f.email === email && f.password === password
      );

      if (!funcionario) {
        return rejectWithValue('Email ou senha incorretos');
      }

      // Retornar dados do usuário
      return {
        id: funcionario.id?.toString() || '',
        fullName: funcionario.fullName,
        email: funcionario.email,
        role: funcionario.role,
        permissions: funcionario.permissions || []
      };
    } catch (error) {
      return rejectWithValue('Erro ao fazer login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;

      // Limpar localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
    },
    clearError: (state) => {
      state.error = null;
    },
    // Ação para restaurar sessão do localStorage
    restoreSession: (state) => {
      const isAuth = localStorage.getItem('isAuthenticated');
      const user = getUserFromStorage();

      if (isAuth && user) {
        state.isAuthenticated = true;
        state.currentUser = user;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.error = null;

        // Salvar no localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, restoreSession } = authSlice.actions;
export default authSlice.reducer;
