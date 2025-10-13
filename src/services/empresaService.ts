const API_URL = 'http://localhost:3001/empresas';

export interface Empresa {
    id?: number | string;
    name: string;
    cnpj: string;
    sector: string;
    address: string;
    phone: string;
    email: string;
    hrContact: string;
    hrPhone: string;
    hrEmail: string;
    availablePositions: string[];
    observations: string;
    activeUsers?: number;
    totalHired?: number;
    lastContact?: string;
    status?: string;
}

export const empresaService = {
    // Buscar todas as empresas
    async getAll(): Promise<Empresa[]> {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro ao buscar empresas');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
            throw error;
        }
    },

    // Buscar empresa por ID
    async getById(id: number | string): Promise<Empresa> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar empresa');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar empresa:', error);
            throw error;
        }
    },

    // Criar nova empresa
    async create(empresa: Omit<Empresa, 'id'>): Promise<Empresa> {
        try {
            const novaEmpresa = {
                ...empresa,
                activeUsers: 0,
                totalHired: 0,
                lastContact: new Date().toISOString().split('T')[0],
                status: 'Ativo'
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaEmpresa),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar empresa');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao cadastrar empresa:', error);
            throw error;
        }
    },

    // Atualizar empresa
    async update(id: number | string, empresa: Partial<Empresa>): Promise<Empresa> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(empresa),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar empresa');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            throw error;
        }
    },

    // Deletar empresa
    async delete(id: number | string): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar empresa');
            }
        } catch (error) {
            console.error('Erro ao deletar empresa:', error);
            throw error;
        }
    },
};
