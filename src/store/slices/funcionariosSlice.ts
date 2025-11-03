import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { funcionarioService, Funcionario } from '../../services/funcionarioService';

interface FuncionariosState {
  funcionarios: Funcionario[];
  loading: boolean;
  error: string | null;
  currentFuncionario: Funcionario | null;
}

const initialState: FuncionariosState = {
  funcionarios: [],
  loading: false,
  error: null,
  currentFuncionario: null,
};

// Async Thunks
export const fetchFuncionarios = createAsyncThunk(
  'funcionarios/fetchAll',
  async () => {
    const response = await funcionarioService.getAll();
    return response;
  }
);

export const fetchFuncionarioById = createAsyncThunk(
  'funcionarios/fetchById',
  async (id: number) => {
    const response = await funcionarioService.getById(id);
    return response;
  }
);

export const createFuncionario = createAsyncThunk(
  'funcionarios/create',
  async (funcionario: Omit<Funcionario, 'id'>) => {
    const response = await funcionarioService.create(funcionario);
    return response;
  }
);

export const updateFuncionario = createAsyncThunk(
  'funcionarios/update',
  async ({ id, data }: { id: number; data: Partial<Funcionario> }) => {
    const response = await funcionarioService.update(id, data);
    return response;
  }
);

export const deleteFuncionario = createAsyncThunk(
  'funcionarios/delete',
  async (id: number) => {
    await funcionarioService.delete(id);
    return id;
  }
);

const funcionariosSlice = createSlice({
  name: 'funcionarios',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentFuncionario: (state, action: PayloadAction<Funcionario | null>) => {
      state.currentFuncionario = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all funcionarios
    builder
      .addCase(fetchFuncionarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFuncionarios.fulfilled, (state, action) => {
        state.loading = false;
        state.funcionarios = action.payload;
      })
      .addCase(fetchFuncionarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar funcionários';
      });

    // Fetch funcionario by ID
    builder
      .addCase(fetchFuncionarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFuncionarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFuncionario = action.payload;
      })
      .addCase(fetchFuncionarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar funcionário';
      });

    // Create funcionario
    builder
      .addCase(createFuncionario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFuncionario.fulfilled, (state, action) => {
        state.loading = false;
        state.funcionarios.push(action.payload);
      })
      .addCase(createFuncionario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar funcionário';
      });

    // Update funcionario
    builder
      .addCase(updateFuncionario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFuncionario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.funcionarios.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.funcionarios[index] = action.payload;
        }
        if (state.currentFuncionario?.id === action.payload.id) {
          state.currentFuncionario = action.payload;
        }
      })
      .addCase(updateFuncionario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar funcionário';
      });

    // Delete funcionario
    builder
      .addCase(deleteFuncionario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFuncionario.fulfilled, (state, action) => {
        state.loading = false;
        state.funcionarios = state.funcionarios.filter(f => f.id !== action.payload);
        if (state.currentFuncionario?.id === action.payload) {
          state.currentFuncionario = null;
        }
      })
      .addCase(deleteFuncionario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar funcionário';
      });
  },
});

export const { clearError, setCurrentFuncionario } = funcionariosSlice.actions;
export default funcionariosSlice.reducer;
