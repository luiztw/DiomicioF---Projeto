const API_URL = 'http://localhost:3001/encaminhamentos';

export interface WorkPlacement {
  id?: string;
  usuarioId: string;
  usuarioNome: string;
  empresa: string;
  cargo: string;
  dataAdmissao: string;
  contatoRH: string;
  telefoneRH: string;
  dataProvaveDesligamento: string;
  status: string;
  createdAt?: string;
}

export const workPlacementService = {
  // Buscar todos os encaminhamentos
  async getAll(): Promise<WorkPlacement[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar encaminhamentos');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar encaminhamentos:', error);
      throw error;
    }
  },

  // Buscar encaminhamento por ID
  async getById(id: string): Promise<WorkPlacement> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar encaminhamento');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar encaminhamento:', error);
      throw error;
    }
  },

  // Buscar encaminhamentos por usuário
  async getByUsuarioId(usuarioId: string): Promise<WorkPlacement[]> {
    try {
      const response = await fetch(`${API_URL}?usuarioId=${usuarioId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar encaminhamentos do usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar encaminhamentos do usuário:', error);
      throw error;
    }
  },

  // Criar novo encaminhamento
  async create(encaminhamento: Omit<WorkPlacement, 'id'>): Promise<WorkPlacement> {
    try {
      const novoEncaminhamento = {
        ...encaminhamento,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoEncaminhamento),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar encaminhamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar encaminhamento:', error);
      throw error;
    }
  },

  // Atualizar encaminhamento
  async update(id: string, encaminhamento: Partial<WorkPlacement>): Promise<WorkPlacement> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encaminhamento),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar encaminhamento');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar encaminhamento:', error);
      throw error;
    }
  },

  // Deletar encaminhamento
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar encaminhamento');
      }
    } catch (error) {
      console.error('Erro ao deletar encaminhamento:', error);
      throw error;
    }
  },
};
