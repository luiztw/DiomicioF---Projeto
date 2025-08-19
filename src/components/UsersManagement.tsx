import React, { useState } from 'react';
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
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
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

            {/* Users List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Usuários Cadastrados ({filteredUsers.length})
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Empresa/Posição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avaliações
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">
                              Ingresso: {new Date(user.admissionDate).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="text-sm text-gray-500">
                              Responsável: {user.parentName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.company || 'Não encaminhado'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.position || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.evaluations}/2 avaliações
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.lastVisit ? `Última visita: ${new Date(user.lastVisit).toLocaleDateString('pt-BR')}` : 'Sem visitas'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 p-1 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Gestão de Usuários</h2>
        <p className="text-gray-600">
          Cadastre, acompanhe e avalie usuários durante todo o processo
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-xl font-medium transition-all ${
                  activeView === item.id
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

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default UsersManagement;