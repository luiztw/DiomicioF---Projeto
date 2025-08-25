import React, { useState } from 'react';
import { UserCheck, Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, Shield, Calendar, Award, Clock } from 'lucide-react';

const EmployeesManagement: React.FC = () => {
  const [activeView, setActiveView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birthDate: '',
    address: '',
    role: '',
    department: '',
    admissionDate: '',
    salary: '',
    workSchedule: '',
    permissions: [] as string[],
    observations: ''
  });

  const employees = [
    {
      id: 1,
      fullName: 'Dr. Ana Paula Silva',
      email: 'ana.silva@sistema.com.br',
      phone: '(11) 99999-1111',
      role: 'Coordenadora Geral',
      department: 'Coordenação',
      admissionDate: '2020-03-15',
      status: 'Ativo',
      permissions: ['admin', 'users', 'companies', 'reports'],
      lastLogin: '2024-01-22 09:30',
      workSchedule: '08:00 - 17:00',
      evaluationsCount: 45,
      visitsCount: 23
    },
    {
      id: 2,
      fullName: 'Prof. Carlos Eduardo Santos',
      email: 'carlos.santos@sistema.com.br',
      phone: '(11) 99999-2222',
      role: 'Professor Avaliador',
      department: 'Avaliação',
      admissionDate: '2021-08-10',
      status: 'Ativo',
      permissions: ['users', 'evaluations'],
      lastLogin: '2024-01-22 08:15',
      workSchedule: '07:00 - 16:00',
      evaluationsCount: 78,
      visitsCount: 12
    },
    {
      id: 3,
      fullName: 'Maria Fernanda Costa',
      email: 'maria.costa@sistema.com.br',
      phone: '(11) 99999-3333',
      role: 'Consultora de RH',
      department: 'Recursos Humanos',
      admissionDate: '2022-01-20',
      status: 'Ativo',
      permissions: ['companies', 'placements', 'followup'],
      lastLogin: '2024-01-21 16:45',
      workSchedule: '08:30 - 17:30',
      evaluationsCount: 12,
      visitsCount: 34
    },
    {
      id: 4,
      fullName: 'João Pedro Oliveira',
      email: 'joao.oliveira@sistema.com.br',
      phone: '(11) 99999-4444',
      role: 'Assistente Administrativo',
      department: 'Administrativo',
      admissionDate: '2023-06-15',
      status: 'Férias',
      permissions: ['users', 'basic'],
      lastLogin: '2024-01-15 17:00',
      workSchedule: '08:00 - 17:00',
      evaluationsCount: 8,
      visitsCount: 5
    }
  ];

  const roles = [
    'Coordenador Geral',
    'Professor Avaliador', 
    'Consultora de RH',
    'Assistente Administrativo',
    'Psicólogo',
    'Assistente Social'
  ];

  const departments = [
    'Coordenação',
    'Avaliação',
    'Recursos Humanos',
    'Administrativo',
    'Psicologia',
    'Serviço Social'
  ];

  const permissionsList = [
    { id: 'admin', label: 'Administrador', description: 'Acesso total ao sistema' },
    { id: 'users', label: 'Gestão de Usuários', description: 'Cadastrar e gerenciar usuários' },
    { id: 'companies', label: 'Gestão de Empresas', description: 'Cadastrar e gerenciar empresas' },
    { id: 'evaluations', label: 'Avaliações', description: 'Realizar avaliações de experiência' },
    { id: 'interviews', label: 'Entrevistas', description: 'Conduzir entrevistas com pais' },
    { id: 'placements', label: 'Encaminhamentos', description: 'Gerenciar encaminhamentos' },
    { id: 'followup', label: 'Acompanhamento', description: 'Realizar visitas de acompanhamento' },
    { id: 'reports', label: 'Relatórios', description: 'Gerar e visualizar relatórios' },
    { id: 'basic', label: 'Acesso Básico', description: 'Visualização limitada' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Funcionário cadastrado:', formData);
    setActiveView('list');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      cpf: '',
      rg: '',
      birthDate: '',
      address: '',
      role: '',
      department: '',
      admissionDate: '',
      salary: '',
      workSchedule: '',
      permissions: [],
      observations: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      case 'Férias': return 'bg-blue-100 text-blue-800';
      case 'Licença': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Coordenadora Geral': return 'text-purple-600';
      case 'Professor Avaliador': return 'text-blue-600';
      case 'Consultora de RH': return 'text-green-600';
      case 'Assistente Administrativo': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || employee.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const renderEmployeeForm = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Cadastrar Novo Funcionário</h3>
        <p className="text-gray-600">
          Registre informações do funcionário e defina permissões de acesso
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Pessoais */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <h4 className="text-xl font-semibold text-gray-900">Informações Pessoais</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Digite o nome completo"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="email@sistema.com.br"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="000.000.000-00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RG</label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="00.000.000-0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Rua, número, bairro, cidade, CEP"
                required
              />
            </div>
          </div>
        </div>

        {/* Informações Profissionais */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-blue-600" />
            <h4 className="text-xl font-semibold text-gray-900">Informações Profissionais</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cargo/Função</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="">Selecione o cargo</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              >
                <option value="">Selecione o departamento</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Trabalho</label>
              <input
                type="text"
                name="workSchedule"
                value={formData.workSchedule}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Ex: 08:00 - 17:00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salário</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="R$ 0.000,00"
              />
            </div>
          </div>
        </div>

        {/* Permissões de Acesso */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-green-600" />
            <h4 className="text-xl font-semibold text-gray-900">Permissões de Acesso</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissionsList.map((permission) => (
              <div key={permission.id} className="bg-white rounded-xl p-4 border border-gray-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{permission.label}</div>
                    <div className="text-sm text-gray-500">{permission.description}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Observações */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h4 className="text-xl font-semibold text-gray-900">Observações</h4>
          </div>
          
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
            placeholder="Informações adicionais sobre o funcionário, especializações, certificações, etc."
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white rounded-xl py-3 px-6 hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-5 h-5" />
            <span>Cadastrar Funcionário</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveView('list')}
            className="bg-gray-600 text-white rounded-xl py-3 px-6 hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  const renderEmployeesList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all appearance-none bg-white"
              >
                <option value="all">Todos os Cargos</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setActiveView('register')}
              className="bg-purple-600 text-white rounded-xl py-3 px-4 hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Novo Funcionário</span>
            </button>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{employee.fullName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                </div>
                <p className={`text-sm font-medium mb-1 ${getRoleColor(employee.role)}`}>{employee.role}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{employee.workSchedule}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Admissão: {new Date(employee.admissionDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Atividades</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{employee.evaluationsCount}</div>
                  <div className="text-xs text-gray-500">Avaliações</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{employee.visitsCount}</div>
                  <div className="text-xs text-gray-500">Visitas</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Último acesso: {employee.lastLogin}
              </div>
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
            </div>

            {/* Permissions Preview */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Permissões</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {employee.permissions.slice(0, 3).map((permission) => (
                  <span key={permission} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {permissionsList.find(p => p.id === permission)?.label}
                  </span>
                ))}
                {employee.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{employee.permissions.length - 3} mais
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    return activeView === 'register' ? renderEmployeeForm() : renderEmployeesList();
  };

  return (
    <div className="space-y-8">
      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default EmployeesManagement;