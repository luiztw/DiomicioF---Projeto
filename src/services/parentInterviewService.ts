const API_URL = 'http://localhost:3001/entrevistas-pais';

export interface ParentInterview {
  id?: string;
  usuarioId: string;
  usuarioNome: string;
  dataEntrevista: string;
  entrevistador: string;
  resumo: string;
  participacaoFamiliar: string;
  parecerApoio: string;
  estimuloAutonomia: string;
  registrosProtecao: string;
  createdAt?: string;
}

export const parentInterviewService = {
  // Buscar todas as entrevistas
  async getAll(): Promise<ParentInterview[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar entrevistas');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar entrevistas:', error);
      throw error;
    }
  },

  // Buscar entrevista por ID
  async getById(id: string): Promise<ParentInterview> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar entrevista');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar entrevista:', error);
      throw error;
    }
  },

  // Buscar entrevistas por usuário
  async getByUsuarioId(usuarioId: string): Promise<ParentInterview[]> {
    try {
      const response = await fetch(`${API_URL}?usuarioId=${usuarioId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar entrevistas do usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar entrevistas do usuário:', error);
      throw error;
    }
  },

  // Criar nova entrevista
  async create(entrevista: Omit<ParentInterview, 'id'>): Promise<ParentInterview> {
    try {
      const novaEntrevista = {
        ...entrevista,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaEntrevista),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar entrevista');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar entrevista:', error);
      throw error;
    }
  },

  // Atualizar entrevista
  async update(id: string, entrevista: Partial<ParentInterview>): Promise<ParentInterview> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entrevista),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar entrevista');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar entrevista:', error);
      throw error;
    }
  },

  // Deletar entrevista
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar entrevista');
      }
    } catch (error) {
      console.error('Erro ao deletar entrevista:', error);
      throw error;
    }
  },
};
