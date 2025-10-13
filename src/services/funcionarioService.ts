const API_URL = 'http://localhost:3001/funcionarios';

export interface Funcionario {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  address: string;
  role: string;
  department: string;
  admissionDate: string;
  salary: string;
  workSchedule: string;
  observations: string;
  password: string;
  status?: string;
  permissions?: string[];
  lastLogin?: string;
  evaluationsCount?: number;
  visitsCount?: number;
}

export const funcionarioService = {
  // Buscar todos os funcionários
  async getAll(): Promise<Funcionario[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      throw error;
    }
  },

  // Buscar funcionário por ID
  async getById(id: number): Promise<Funcionario> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionário');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      throw error;
    }
  },

  // Criar novo funcionário
  async create(funcionario: Omit<Funcionario, 'id'>): Promise<Funcionario> {
    try {
      const novoFuncionario = {
        ...funcionario,
        status: 'Ativo',
        permissions: ['users', 'basic'],
        lastLogin: '',
        evaluationsCount: 0,
        visitsCount: 0
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFuncionario),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar funcionário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      throw error;
    }
  },

  // Atualizar funcionário
  async update(id: number, funcionario: Partial<Funcionario>): Promise<Funcionario> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar funcionário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw error;
    }
  },

  // Deletar funcionário
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar funcionário');
      }
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw error;
    }
  },
};
