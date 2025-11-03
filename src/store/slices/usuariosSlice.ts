import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { usuarioService, Usuario } from '../../services/usuarioService';

interface UsuariosState {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  currentUsuario: Usuario | null;
}

const initialState: UsuariosState = {
  usuarios: [],
  loading: false,
  error: null,
  currentUsuario: null,
};

// Async Thunks
export const fetchUsuarios = createAsyncThunk(
  'usuarios/fetchAll',
  async () => {
    const response = await usuarioService.getAll();
    return response;
  }
);

export const fetchUsuarioById = createAsyncThunk(
  'usuarios/fetchById',
  async (id: string) => {
    const response = await usuarioService.getById(id);
    return response;
  }
);

export const createUsuario = createAsyncThunk(
  'usuarios/create',
  async (usuario: Omit<Usuario, 'id'>) => {
    const response = await usuarioService.create(usuario);
    return response;
  }
);

export const updateUsuario = createAsyncThunk(
  'usuarios/update',
  async ({ id, data }: { id: string; data: Partial<Usuario> }) => {
    const response = await usuarioService.update(id, data);
    return response;
  }
);

export const deleteUsuario = createAsyncThunk(
  'usuarios/delete',
  async (id: string) => {
    await usuarioService.delete(id);
    return id;
  }
);

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentUsuario: (state, action: PayloadAction<Usuario | null>) => {
      state.currentUsuario = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all usuarios
    builder
      .addCase(fetchUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar usuários';
      });

    // Fetch usuario by ID
    builder
      .addCase(fetchUsuarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUsuario = action.payload;
      })
      .addCase(fetchUsuarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar usuário';
      });

    // Create usuario
    builder
      .addCase(createUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios.push(action.payload);
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar usuário';
      });

    // Update usuario
    builder
      .addCase(updateUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.usuarios[index] = action.payload;
        }
        if (state.currentUsuario?.id === action.payload.id) {
          state.currentUsuario = action.payload;
        }
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar usuário';
      });

    // Delete usuario
    builder
      .addCase(deleteUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = state.usuarios.filter(u => u.id !== action.payload);
        if (state.currentUsuario?.id === action.payload) {
          state.currentUsuario = null;
        }
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar usuário';
      });
  },
});

export const { clearError, setCurrentUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;
