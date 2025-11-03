const API_URL = 'http://localhost:3001/avaliacoes';

export interface Avaliacao {
  id?: string;
  usuarioId: string;
  usuarioNome: string;
  tipoAvaliacao: 'first' | 'second';
  dataAvaliacao: string;
  respostas: { [key: number]: string };
  observacoes: string;
  avaliador: string;
  createdAt?: string;
}

export const avaliacaoService = {
  // Buscar todas as avaliações
  async getAll(): Promise<Avaliacao[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliações');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      throw error;
    }
  },

  // Buscar avaliação por ID
  async getById(id: string): Promise<Avaliacao> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliação');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar avaliação:', error);
      throw error;
    }
  },

  // Buscar avaliações por usuário
  async getByUsuarioId(usuarioId: string): Promise<Avaliacao[]> {
    try {
      const response = await fetch(`${API_URL}?usuarioId=${usuarioId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliações do usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar avaliações do usuário:', error);
      throw error;
    }
  },

  // Criar nova avaliação
  async create(avaliacao: Omit<Avaliacao, 'id'>): Promise<Avaliacao> {
    try {
      const novaAvaliacao = {
        ...avaliacao,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaAvaliacao),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar avaliação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar avaliação:', error);
      throw error;
    }
  },

  // Atualizar avaliação
  async update(id: string, avaliacao: Partial<Avaliacao>): Promise<Avaliacao> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(avaliacao),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar avaliação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw error;
    }
  },

  // Deletar avaliação
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar avaliação');
      }
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      throw error;
    }
  },
};
