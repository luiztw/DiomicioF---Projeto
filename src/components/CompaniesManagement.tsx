import React, { useState } from 'react';
import { Building, Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, MapPin, Users, Calendar } from 'lucide-react';

const CompaniesManagement: React.FC = () => {
  const [activeView, setActiveView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    sector: '',
    address: '',
    phone: '',
    email: '',
    hrContact: '',
    hrPhone: '',
    hrEmail: '',
    availablePositions: '',
    observations: ''
  });

  const companies = [
    {
      id: 1,
      name: 'Supermercado Central',
      cnpj: '12.345.678/0001-90',
      sector: 'Varejo',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 3333-1111',
      email: 'contato@supercentral.com.br',
      hrContact: 'Sandra Oliveira',
      hrPhone: '(11) 3333-1122',
      hrEmail: 'rh@supercentral.com.br',
      activeUsers: 3,
      totalHired: 8,
      lastContact: '2024-01-20',
      status: 'Ativo'
    },
    {
      id: 2,
      name: 'Padaria São José',
      cnpj: '98.765.432/0001-10',
      sector: 'Alimentação',
      address: 'Av. Principal, 456 - Vila Nova',
      phone: '(11) 4444-2222',
      email: 'contato@padariasaojose.com.br',
      hrContact: 'Roberto Silva',
      hrPhone: '(11) 4444-2233',
      hrEmail: 'roberto@padariasaojose.com.br',
      activeUsers: 2,
      totalHired: 5,
      lastContact: '2024-01-18',
      status: 'Ativo'
    },
    {
      id: 3,
      name: 'Loja Fashion Style',
      cnpj: '11.222.333/0001-44',
      sector: 'Moda',
      address: 'Shopping Center, Loja 45',
      phone: '(11) 5555-3333',
      email: 'contato@fashionstyle.com.br',
      hrContact: 'Maria Fernandes',
      hrPhone: '(11) 5555-3344',
      hrEmail: 'rh@fashionstyle.com.br',
      activeUsers: 1,
      totalHired: 3,
      lastContact: '2024-01-15',
      status: 'Inativo'
    }
  ];

  const sectors = ['Varejo', 'Alimentação', 'Moda', 'Serviços', 'Indústria', 'Saúde', 'Educação'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Empresa cadastrada:', formData);
    setActiveView('list');
    // Reset form
    setFormData({
      name: '',
      cnpj: '',
      sector: '',
      address: '',
      phone: '',
      email: '',
      hrContact: '',
      hrPhone: '',
      hrEmail: '',
      availablePositions: '',
      observations: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  const renderCompanyForm = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Cadastrar Nova Empresa</h3>
        <p className="text-gray-600">
          Registre informações da empresa parceira
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações da Empresa */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Building className="w-5 h-5 text-green-600" />
            <h4 className="text-xl font-semibold text-gray-900">Informações da Empresa</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Digite o nome da empresa"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="00.000.000/0000-00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Setor</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
              >
                <option value="">Selecione o setor</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="(00) 0000-0000"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Rua, número, bairro, cidade, CEP"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="contato@empresa.com.br"
              />
            </div>
          </div>
        </div>

        {/* Contato RH */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-5 h-5 text-blue-600" />
            <h4 className="text-xl font-semibold text-gray-900">Contato do RH</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável</label>
              <input
                type="text"
                name="hrContact"
                value={formData.hrContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Nome do responsável pelo RH"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do RH</label>
              <input
                type="tel"
                name="hrPhone"
                value={formData.hrPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="(00) 0000-0000"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail do RH</label>
              <input
                type="email"
                name="hrEmail"
                value={formData.hrEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="rh@empresa.com.br"
              />
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h4 className="text-xl font-semibold text-gray-900">Informações Adicionais</h4>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vagas Disponíveis</label>
              <input
                type="text"
                name="availablePositions"
                value={formData.availablePositions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                placeholder="Ex: Auxiliar de Limpeza, Organizador de Estoque"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                placeholder="Informações adicionais sobre a empresa, requisitos especiais, horários de funcionamento, etc."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white rounded-xl py-3 px-6 hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Building className="w-5 h-5" />
            <span>Cadastrar Empresa</span>
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

  const renderCompaniesList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all appearance-none bg-white"
              >
                <option value="all">Todos os Setores</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setActiveView('register')}
              className="bg-green-600 text-white rounded-xl py-3 px-4 hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nova Empresa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                    {company.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{company.sector}</p>
                <p className="text-sm text-gray-500">{company.cnpj}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{company.email}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Contato RH</h4>
              <p className="text-sm text-gray-600">{company.hrContact}</p>
              <p className="text-sm text-gray-500">{company.hrPhone}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{company.activeUsers}</div>
                <div className="text-xs text-gray-500">Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">{company.totalHired}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-900 font-medium">
                  {new Date(company.lastContact).toLocaleDateString('pt-BR')}
                </div>
                <div className="text-xs text-gray-500">Último contato</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
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
              <button className="bg-green-600 text-white rounded-lg px-3 py-1 hover:bg-green-700 transition-colors text-sm">
                Contatar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    return activeView === 'register' ? renderCompanyForm() : renderCompaniesList();
  };

  return (
    <div className="space-y-8">
      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default CompaniesManagement;