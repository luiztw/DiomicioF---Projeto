import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, FileText, Calendar, Briefcase } from 'lucide-react';
import UserRegistration from './UserRegistration';
import TrialPeriod from './TrialPeriod';
import ParentInterview from './ParentInterview';
import WorkPlacement from './WorkPlacement';
import FollowUp from './FollowUp';

const UsersManagement: React.FC = () => {
    const [activeView, setActiveView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [editUser, setEditUser] = useState<any>(null);

    // Travar o scroll do fundo quando modal está aberto
    useEffect(() => {
        if (selectedUser || editUser) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedUser, editUser]);

    const users = [
        {
            id: 1,
            name: 'Maria Silva Santos',
            birthDate: '1995-03-15',
            admissionDate: '2024-01-10',
            status: 'Ativo',
            company: 'Supermercado Central',
            position: 'Auxiliar de Limpeza',
            phone: '(11) 99999-1111',
            parentName: 'José Silva',
            evaluations: 2,
            lastVisit: '2024-01-20'
        },
        {
            id: 2,
            name: 'João Pedro Lima',
            birthDate: '1992-07-22',
            admissionDate: '2024-01-15',
            status: 'Em Experiência',
            company: 'Padaria São José',
            position: 'Auxiliar de Produção',
            phone: '(11) 99999-2222',
            parentName: 'Ana Lima',
            evaluations: 1,
            lastVisit: null
        },
        {
            id: 3,
            name: 'Ana Costa Ferreira',
            birthDate: '1998-11-08',
            admissionDate: '2023-12-05',
            status: 'Aguardando',
            company: null,
            position: null,
            phone: '(11) 99999-3333',
            parentName: 'Carlos Costa',
            evaluations: 2,
            lastVisit: null
        }
    ];

    const menuItems = [
        { id: 'list', label: 'Lista de Usuários', icon: Users, color: 'text-blue-600' },
        { id: 'register', label: 'Cadastrar Usuário', icon: Plus, color: 'text-green-600' },
        { id: 'evaluation', label: 'Período de Experiência', icon: FileText, color: 'text-purple-600' },
        { id: 'interview', label: 'Entrevista com Pais', icon: Calendar, color: 'text-red-600' },
        { id: 'placement', label: 'Encaminhamento', icon: Briefcase, color: 'text-orange-600' },
        { id: 'followup', label: 'Acompanhamento', icon: Eye, color: 'text-teal-600' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ativo': return 'bg-green-100 text-green-800';
            case 'Em Experiência': return 'bg-yellow-100 text-yellow-800';
            case 'Aguardando': return 'bg-blue-100 text-blue-800';
            case 'Desligado': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const renderUserModal = () => {
        if (!selectedUser) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xl max-w-xl w-full p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                        onClick={() => setSelectedUser(null)}
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Dados do Usuário</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Nome:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.name}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Nascimento:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.birthDate}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Admissão:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.admissionDate}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Status:</span>
                                <span className={`ml-2 px-2 py-1 rounded ${getStatusColor(selectedUser.status)}`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Avaliações:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.evaluations}</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Empresa:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.company || '—'}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Cargo:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.position || '—'}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Telefone:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.phone}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Responsável:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.parentName}</span>
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-gray-700">Última visita:</span>
                                <span className="ml-2 text-gray-900">{selectedUser.lastVisit || '—'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderEditUserModal = () => {
        if (!editUser) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
                <div className="relative w-full max-w-4xl h-[95vh] flex items-center justify-center">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full overflow-y-auto h-full relative">
                        <div className="sticky top-0 left-0 z-10 bg-white p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Editar Usuário</h2>
                                <button
                                    className="text-gray-400 hover:text-gray-700 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 transition-colors"
                                    onClick={() => setEditUser(null)}
                                    aria-label="Fechar"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <UserRegistration
                                user={editUser}
                                mode="edit"
                                onCancel={() => setEditUser(null)}
                                onSave={() => {
                                    // Atualize os dados do usuário na lista, se necessário
                                    setEditUser(null);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderUsersList = () => (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar usuários..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none bg-white"
                            >
                                <option value="all">Todos os Status</option>
                                <option value="Ativo">Ativo</option>
                                <option value="Em Experiência">Em Experiência</option>
                                <option value="Aguardando">Aguardando</option>
                                <option value="Desligado">Desligado</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(user.status)}`}>{user.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.company || '—'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.position || '—'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.parentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="text-blue-600 hover:text-blue-900 p-2 rounded"
                                            onClick={() => setSelectedUser(user)}
                                            title="Visualizar cadastro"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-gray-800 p-2 rounded"
                                            title="Editar"
                                            onClick={() => setEditUser(user)}
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900 p-2 rounded"
                                            title="Excluir"
                                        // onClick={...}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {renderUserModal()}
            {renderEditUserModal()}
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case 'register':
                return <UserRegistration />;
            case 'evaluation':
                return <TrialPeriod />;
            case 'interview':
                return <ParentInterview />;
            case 'placement':
                return <WorkPlacement />;
            case 'followup':
                return <FollowUp />;
            default:
                return renderUsersList();
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={`flex flex-col items-center space-y-2 p-4 rounded-xl font-medium transition-all ${activeView === item.id
                                        ? 'bg-gray-100 text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${activeView === item.id ? item.color : ''}`} />
                                <span className="text-sm text-center">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            {renderContent()}
        </div>
    );
};

export default UsersManagement;