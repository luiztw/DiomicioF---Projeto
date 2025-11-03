import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { empresaService, Empresa } from '../../services/empresaService';

interface EmpresasState {
  empresas: Empresa[];
  loading: boolean;
  error: string | null;
  currentEmpresa: Empresa | null;
}

const initialState: EmpresasState = {
  empresas: [],
  loading: false,
  error: null,
  currentEmpresa: null,
};

// Async Thunks
export const fetchEmpresas = createAsyncThunk(
  'empresas/fetchAll',
  async () => {
    const response = await empresaService.getAll();
    return response;
  }
);

export const fetchEmpresaById = createAsyncThunk(
  'empresas/fetchById',
  async (id: number | string) => {
    const response = await empresaService.getById(id);
    return response;
  }
);

export const createEmpresa = createAsyncThunk(
  'empresas/create',
  async (empresa: Omit<Empresa, 'id'>) => {
    const response = await empresaService.create(empresa);
    return response;
  }
);

export const updateEmpresa = createAsyncThunk(
  'empresas/update',
  async ({ id, data }: { id: number | string; data: Partial<Empresa> }) => {
    const response = await empresaService.update(id, data);
    return response;
  }
);

export const deleteEmpresa = createAsyncThunk(
  'empresas/delete',
  async (id: number | string) => {
    await empresaService.delete(id);
    return id;
  }
);

const empresasSlice = createSlice({
  name: 'empresas',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEmpresa: (state, action: PayloadAction<Empresa | null>) => {
      state.currentEmpresa = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all empresas
    builder
      .addCase(fetchEmpresas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpresas.fulfilled, (state, action) => {
        state.loading = false;
        state.empresas = action.payload;
      })
      .addCase(fetchEmpresas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar empresas';
      });

    // Fetch empresa by ID
    builder
      .addCase(fetchEmpresaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpresaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEmpresa = action.payload;
      })
      .addCase(fetchEmpresaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar empresa';
      });

    // Create empresa
    builder
      .addCase(createEmpresa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmpresa.fulfilled, (state, action) => {
        state.loading = false;
        state.empresas.push(action.payload);
      })
      .addCase(createEmpresa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar empresa';
      });

    // Update empresa
    builder
      .addCase(updateEmpresa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmpresa.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.empresas.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.empresas[index] = action.payload;
        }
        if (state.currentEmpresa?.id === action.payload.id) {
          state.currentEmpresa = action.payload;
        }
      })
      .addCase(updateEmpresa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar empresa';
      });

    // Delete empresa
    builder
      .addCase(deleteEmpresa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmpresa.fulfilled, (state, action) => {
        state.loading = false;
        state.empresas = state.empresas.filter(e => e.id !== action.payload);
        if (state.currentEmpresa?.id === action.payload) {
          state.currentEmpresa = null;
        }
      })
      .addCase(deleteEmpresa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar empresa';
      });
  },
});

export const { clearError, setCurrentEmpresa } = empresasSlice.actions;
export default empresasSlice.reducer;
