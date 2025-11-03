import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { workPlacementService, WorkPlacement } from '../../services/workPlacementService';

interface WorkPlacementsState {
  encaminhamentos: WorkPlacement[];
  loading: boolean;
  error: string | null;
  currentEncaminhamento: WorkPlacement | null;
}

const initialState: WorkPlacementsState = {
  encaminhamentos: [],
  loading: false,
  error: null,
  currentEncaminhamento: null,
};

// Async Thunks
export const fetchWorkPlacements = createAsyncThunk(
  'workPlacements/fetchAll',
  async () => {
    const response = await workPlacementService.getAll();
    return response;
  }
);

export const fetchWorkPlacementById = createAsyncThunk(
  'workPlacements/fetchById',
  async (id: string) => {
    const response = await workPlacementService.getById(id);
    return response;
  }
);

export const fetchWorkPlacementsByUsuarioId = createAsyncThunk(
  'workPlacements/fetchByUsuarioId',
  async (usuarioId: string) => {
    const response = await workPlacementService.getByUsuarioId(usuarioId);
    return response;
  }
);

export const createWorkPlacement = createAsyncThunk(
  'workPlacements/create',
  async (encaminhamento: Omit<WorkPlacement, 'id'>) => {
    const response = await workPlacementService.create(encaminhamento);
    return response;
  }
);

export const updateWorkPlacement = createAsyncThunk(
  'workPlacements/update',
  async ({ id, data }: { id: string; data: Partial<WorkPlacement> }) => {
    const response = await workPlacementService.update(id, data);
    return response;
  }
);

export const deleteWorkPlacement = createAsyncThunk(
  'workPlacements/delete',
  async (id: string) => {
    await workPlacementService.delete(id);
    return id;
  }
);

const workPlacementsSlice = createSlice({
  name: 'workPlacements',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEncaminhamento: (state, action: PayloadAction<WorkPlacement | null>) => {
      state.currentEncaminhamento = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all encaminhamentos
    builder
      .addCase(fetchWorkPlacements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkPlacements.fulfilled, (state, action) => {
        state.loading = false;
        state.encaminhamentos = action.payload;
      })
      .addCase(fetchWorkPlacements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar encaminhamentos';
      });

    // Fetch encaminhamento by ID
    builder
      .addCase(fetchWorkPlacementById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkPlacementById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEncaminhamento = action.payload;
      })
      .addCase(fetchWorkPlacementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar encaminhamento';
      });

    // Fetch encaminhamentos by usuario ID
    builder
      .addCase(fetchWorkPlacementsByUsuarioId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkPlacementsByUsuarioId.fulfilled, (state, action) => {
        state.loading = false;
        state.encaminhamentos = action.payload;
      })
      .addCase(fetchWorkPlacementsByUsuarioId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar encaminhamentos do usuário';
      });

    // Create encaminhamento
    builder
      .addCase(createWorkPlacement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkPlacement.fulfilled, (state, action) => {
        state.loading = false;
        state.encaminhamentos.push(action.payload);
      })
      .addCase(createWorkPlacement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar encaminhamento';
      });

    // Update encaminhamento
    builder
      .addCase(updateWorkPlacement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkPlacement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.encaminhamentos.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.encaminhamentos[index] = action.payload;
        }
        if (state.currentEncaminhamento?.id === action.payload.id) {
          state.currentEncaminhamento = action.payload;
        }
      })
      .addCase(updateWorkPlacement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar encaminhamento';
      });

    // Delete encaminhamento
    builder
      .addCase(deleteWorkPlacement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkPlacement.fulfilled, (state, action) => {
        state.loading = false;
        state.encaminhamentos = state.encaminhamentos.filter(e => e.id !== action.payload);
        if (state.currentEncaminhamento?.id === action.payload) {
          state.currentEncaminhamento = null;
        }
      })
      .addCase(deleteWorkPlacement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar encaminhamento';
      });
  },
});

export const { clearError, setCurrentEncaminhamento } = workPlacementsSlice.actions;
export default workPlacementsSlice.reducer;
