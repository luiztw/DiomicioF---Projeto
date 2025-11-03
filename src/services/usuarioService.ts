const API_URL = 'http://localhost:3001/usuarios';

export interface Usuario {
  id?: string;
  fullName: string;
  birthDate: string;
  rg: string;
  cpf: string;
  address: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  emergencyContact: string;
  admissionDate: string;
  observations: string;
  status?: string;
  createdAt?: string;
}

export const usuarioService = {
  // Buscar todos os usuários
  async getAll(): Promise<Usuario[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Buscar usuário por ID
  async getById(id: string): Promise<Usuario> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  // Criar novo usuário
  async create(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
    try {
      const novoUsuario = {
        ...usuario,
        status: 'Ativo',
        createdAt: new Date().toISOString()
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  },

  // Atualizar usuário
  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // Deletar usuário
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  },
};
