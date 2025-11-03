import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { parentInterviewService, ParentInterview } from '../../services/parentInterviewService';

interface ParentInterviewsState {
  entrevistas: ParentInterview[];
  loading: boolean;
  error: string | null;
  currentEntrevista: ParentInterview | null;
}

const initialState: ParentInterviewsState = {
  entrevistas: [],
  loading: false,
  error: null,
  currentEntrevista: null,
};

// Async Thunks
export const fetchParentInterviews = createAsyncThunk(
  'parentInterviews/fetchAll',
  async () => {
    const response = await parentInterviewService.getAll();
    return response;
  }
);

export const fetchParentInterviewById = createAsyncThunk(
  'parentInterviews/fetchById',
  async (id: string) => {
    const response = await parentInterviewService.getById(id);
    return response;
  }
);

export const fetchParentInterviewsByUsuarioId = createAsyncThunk(
  'parentInterviews/fetchByUsuarioId',
  async (usuarioId: string) => {
    const response = await parentInterviewService.getByUsuarioId(usuarioId);
    return response;
  }
);

export const createParentInterview = createAsyncThunk(
  'parentInterviews/create',
  async (entrevista: Omit<ParentInterview, 'id'>) => {
    const response = await parentInterviewService.create(entrevista);
    return response;
  }
);

export const updateParentInterview = createAsyncThunk(
  'parentInterviews/update',
  async ({ id, data }: { id: string; data: Partial<ParentInterview> }) => {
    const response = await parentInterviewService.update(id, data);
    return response;
  }
);

export const deleteParentInterview = createAsyncThunk(
  'parentInterviews/delete',
  async (id: string) => {
    await parentInterviewService.delete(id);
    return id;
  }
);

const parentInterviewsSlice = createSlice({
  name: 'parentInterviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEntrevista: (state, action: PayloadAction<ParentInterview | null>) => {
      state.currentEntrevista = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all entrevistas
    builder
      .addCase(fetchParentInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.entrevistas = action.payload;
      })
      .addCase(fetchParentInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar entrevistas';
      });

    // Fetch entrevista by ID
    builder
      .addCase(fetchParentInterviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentInterviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEntrevista = action.payload;
      })
      .addCase(fetchParentInterviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar entrevista';
      });

    // Fetch entrevistas by usuario ID
    builder
      .addCase(fetchParentInterviewsByUsuarioId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParentInterviewsByUsuarioId.fulfilled, (state, action) => {
        state.loading = false;
        state.entrevistas = action.payload;
      })
      .addCase(fetchParentInterviewsByUsuarioId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar entrevistas do usuário';
      });

    // Create entrevista
    builder
      .addCase(createParentInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParentInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.entrevistas.push(action.payload);
      })
      .addCase(createParentInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar entrevista';
      });

    // Update entrevista
    builder
      .addCase(updateParentInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParentInterview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.entrevistas.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.entrevistas[index] = action.payload;
        }
        if (state.currentEntrevista?.id === action.payload.id) {
          state.currentEntrevista = action.payload;
        }
      })
      .addCase(updateParentInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar entrevista';
      });

    // Delete entrevista
    builder
      .addCase(deleteParentInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParentInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.entrevistas = state.entrevistas.filter(e => e.id !== action.payload);
        if (state.currentEntrevista?.id === action.payload) {
          state.currentEntrevista = null;
        }
      })
      .addCase(deleteParentInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar entrevista';
      });
  },
});

export const { clearError, setCurrentEntrevista } = parentInterviewsSlice.actions;
export default parentInterviewsSlice.reducer;
