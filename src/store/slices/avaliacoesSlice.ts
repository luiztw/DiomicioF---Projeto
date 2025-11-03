import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { avaliacaoService, Avaliacao } from '../../services/avaliacaoService';

interface AvaliacoesState {
  avaliacoes: Avaliacao[];
  loading: boolean;
  error: string | null;
  currentAvaliacao: Avaliacao | null;
}

const initialState: AvaliacoesState = {
  avaliacoes: [],
  loading: false,
  error: null,
  currentAvaliacao: null,
};

// Async Thunks
export const fetchAvaliacoes = createAsyncThunk(
  'avaliacoes/fetchAll',
  async () => {
    const response = await avaliacaoService.getAll();
    return response;
  }
);

export const fetchAvaliacaoById = createAsyncThunk(
  'avaliacoes/fetchById',
  async (id: string) => {
    const response = await avaliacaoService.getById(id);
    return response;
  }
);

export const fetchAvaliacoesByUsuarioId = createAsyncThunk(
  'avaliacoes/fetchByUsuarioId',
  async (usuarioId: string) => {
    const response = await avaliacaoService.getByUsuarioId(usuarioId);
    return response;
  }
);

export const createAvaliacao = createAsyncThunk(
  'avaliacoes/create',
  async (avaliacao: Omit<Avaliacao, 'id'>) => {
    const response = await avaliacaoService.create(avaliacao);
    return response;
  }
);

export const updateAvaliacao = createAsyncThunk(
  'avaliacoes/update',
  async ({ id, data }: { id: string; data: Partial<Avaliacao> }) => {
    const response = await avaliacaoService.update(id, data);
    return response;
  }
);

export const deleteAvaliacao = createAsyncThunk(
  'avaliacoes/delete',
  async (id: string) => {
    await avaliacaoService.delete(id);
    return id;
  }
);

const avaliacoesSlice = createSlice({
  name: 'avaliacoes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentAvaliacao: (state, action: PayloadAction<Avaliacao | null>) => {
      state.currentAvaliacao = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all avaliacoes
    builder
      .addCase(fetchAvaliacoes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
        state.loading = false;
        state.avaliacoes = action.payload;
      })
      .addCase(fetchAvaliacoes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar avaliações';
      });

    // Fetch avaliacao by ID
    builder
      .addCase(fetchAvaliacaoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvaliacaoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAvaliacao = action.payload;
      })
      .addCase(fetchAvaliacaoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar avaliação';
      });

    // Fetch avaliacoes by usuario ID
    builder
      .addCase(fetchAvaliacoesByUsuarioId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvaliacoesByUsuarioId.fulfilled, (state, action) => {
        state.loading = false;
        state.avaliacoes = action.payload;
      })
      .addCase(fetchAvaliacoesByUsuarioId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar avaliações do usuário';
      });

    // Create avaliacao
    builder
      .addCase(createAvaliacao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAvaliacao.fulfilled, (state, action) => {
        state.loading = false;
        state.avaliacoes.push(action.payload);
      })
      .addCase(createAvaliacao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar avaliação';
      });

    // Update avaliacao
    builder
      .addCase(updateAvaliacao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvaliacao.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.avaliacoes.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.avaliacoes[index] = action.payload;
        }
        if (state.currentAvaliacao?.id === action.payload.id) {
          state.currentAvaliacao = action.payload;
        }
      })
      .addCase(updateAvaliacao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao atualizar avaliação';
      });

    // Delete avaliacao
    builder
      .addCase(deleteAvaliacao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAvaliacao.fulfilled, (state, action) => {
        state.loading = false;
        state.avaliacoes = state.avaliacoes.filter(a => a.id !== action.payload);
        if (state.currentAvaliacao?.id === action.payload) {
          state.currentAvaliacao = null;
        }
      })
      .addCase(deleteAvaliacao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao deletar avaliação';
      });
  },
});

export const { clearError, setCurrentAvaliacao } = avaliacoesSlice.actions;
export default avaliacoesSlice.reducer;
