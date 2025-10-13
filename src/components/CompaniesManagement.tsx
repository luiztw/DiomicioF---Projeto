import React, { useState, useEffect } from 'react';
import { Building, Plus, Search, Filter, Edit, Trash2, Phone, Mail, MapPin, Users, Calendar, Eye } from 'lucide-react';
import { empresaService, Empresa } from '../services/empresaService';
// @ts-ignore
import { useMask } from '@react-input/mask';

const CompaniesManagement: React.FC = () => {
    const [activeView, setActiveView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [sectorFilter, setSectorFilter] = useState('all');
    const [companies, setCompanies] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingCompanyId, setEditingCompanyId] = useState<number | string | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<Empresa | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
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
        availablePositions: [''],
        observations: ''
    });

    // Máscaras de input
    const cnpjInputRef = useMask({ mask: '__.___.___/____-__', replacement: { _: /\d/ } });
    const phoneInputRef = useMask({ mask: '(__) ____-____', replacement: { _: /\d/ } });
    const hrPhoneInputRef = useMask({ mask: '(__) ____-____', replacement: { _: /\d/ } });

    const sectors = ['Varejo', 'Alimentação', 'Moda', 'Serviços', 'Indústria', 'Saúde', 'Educação'];

    // Buscar empresas ao carregar o componente
    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            setLoading(true);
            const data = await empresaService.getAll();
            setCompanies(data);
        } catch (error) {
            console.error('Erro ao carregar empresas:', error);
            alert('Erro ao carregar empresas. Verifique se o json-server está rodando.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função para adicionar nova vaga
    const handleAddPosition = () => {
        setFormData(prev => ({
            ...prev,
            availablePositions: [...prev.availablePositions, '']
        }));
    };

    // Função para remover vaga
    const handleRemovePosition = (index: number) => {
        setFormData(prev => ({
            ...prev,
            availablePositions: prev.availablePositions.filter((_, i) => i !== index)
        }));
    };

    // Função para atualizar vaga específica
    const handlePositionChange = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            availablePositions: prev.availablePositions.map((pos, i) => i === index ? value : pos)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (editingCompanyId) {
                // Atualizar empresa existente
                await empresaService.update(editingCompanyId, formData);
                alert('Empresa atualizada com sucesso!');
                setEditingCompanyId(null);
            } else {
                // Criar nova empresa
                await empresaService.create(formData);
                alert('Empresa cadastrada com sucesso!');
            }

            // Recarregar lista de empresas
            await loadCompanies();

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
                availablePositions: [''],
                observations: ''
            });

            setActiveView('list');
        } catch (error) {
            console.error('Erro ao salvar empresa:', error);
            alert('Erro ao salvar empresa. Verifique se o json-server está rodando.');
        } finally {
            setLoading(false);
        }
    };

    // Função para visualizar empresa
    const handleViewCompany = (company: Empresa) => {
        setSelectedCompany(company);
        setShowViewModal(true);
    };

    // Função para editar empresa
    const handleEditCompany = (company: Empresa) => {
        setEditingCompanyId(company.id || null);
        setFormData({
            name: company.name,
            cnpj: company.cnpj,
            sector: company.sector,
            address: company.address,
            phone: company.phone,
            email: company.email,
            hrContact: company.hrContact,
            hrPhone: company.hrPhone,
            hrEmail: company.hrEmail,
            availablePositions: company.availablePositions,
            observations: company.observations
        });
        setActiveView('register');
    };

    // Função para excluir empresa
    const handleDeleteCompany = async (id: number | string | undefined) => {
        if (!id) return;

        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta empresa?');
        if (!confirmDelete) return;

        try {
            setLoading(true);
            await empresaService.delete(id);
            await loadCompanies();
            alert('Empresa excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir empresa:', error);
            alert('Erro ao excluir empresa. Tente novamente.');
        } finally {
            setLoading(false);
        }
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
                <div className={`w-16 h-16 bg-gradient-to-br ${editingCompanyId ? 'from-blue-600 to-blue-500' : 'from-green-600 to-green-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {editingCompanyId ? <Edit className="w-8 h-8 text-white" /> : <Plus className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {editingCompanyId ? 'Editar Empresa' : 'Cadastrar Nova Empresa'}
                </h3>
                <p className="text-gray-600">
                    {editingCompanyId ? 'Atualize as informações da empresa' : 'Registre informações da empresa parceira'}
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
                                ref={cnpjInputRef}
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
                                ref={phoneInputRef}
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
                                ref={hrPhoneInputRef}
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
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">Vagas Disponíveis</label>
                                <button
                                    type="button"
                                    onClick={handleAddPosition}
                                    className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Adicionar Vaga</span>
                                </button>
                            </div>
                            <div className="space-y-3">
                                {formData.availablePositions.map((position, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={position}
                                            onChange={(e) => handlePositionChange(index, e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                            placeholder={`Ex: ${index === 0 ? 'Auxiliar de Limpeza' : index === 1 ? 'Organizador de Estoque' : 'Nome da vaga'}`}
                                        />
                                        {formData.availablePositions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePosition(index)}
                                                className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                title="Remover vaga"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
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
                        className={`flex-1 ${editingCompanyId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-xl py-3 px-6 transition-colors flex items-center justify-center space-x-2`}
                    >
                        {editingCompanyId ? <Edit className="w-5 h-5" /> : <Building className="w-5 h-5" />}
                        <span>{editingCompanyId ? 'Atualizar Empresa' : 'Cadastrar Empresa'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setActiveView('list');
                            setEditingCompanyId(null);
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
                                availablePositions: [''],
                                observations: ''
                            });
                        }}
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
            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="mt-2 text-gray-600">Carregando empresas...</p>
                </div>
            )}

            {/* Search and Filters */}
            {!loading && <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
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
            </div>}

            {/* Companies Grid */}
            {!loading && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCompanies.map((company) => (
                    <div key={company.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status || 'Ativo')}`}>
                                        {company.status || 'Ativo'}
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

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-green-600">{company.activeUsers || 0}</div>
                                <div className="text-xs text-gray-500">Ativos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-blue-600">{company.totalHired || 0}</div>
                                <div className="text-xs text-gray-500">Total</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleViewCompany(company)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                    title="Visualizar"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleEditCompany(company)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded"
                                    title="Editar"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteCompany(company.id)}
                                    className="text-red-600 hover:text-red-900 p-1 rounded"
                                    title="Excluir"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );

    // Modal de visualização
    const renderViewModal = () => {
        if (!showViewModal || !selectedCompany) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                    {/* Header Sticky */}
                    <div className="p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">Detalhes da Empresa</h3>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    setSelectedCompany(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                    </div>

                    {/* Conteúdo com scroll */}
                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        {/* Informações da Empresa */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Building className="w-5 h-5 mr-2 text-green-600" />
                                Informações da Empresa
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nome da Empresa</label>
                                    <p className="text-gray-900">{selectedCompany.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">CNPJ</label>
                                    <p className="text-gray-900">{selectedCompany.cnpj}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Setor</label>
                                    <p className="text-gray-900">{selectedCompany.sector}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Telefone</label>
                                    <p className="text-gray-900">{selectedCompany.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">E-mail</label>
                                    <p className="text-gray-900">{selectedCompany.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCompany.status || 'Ativo')}`}>
                                        {selectedCompany.status || 'Ativo'}
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-500">Endereço</label>
                                    <p className="text-gray-900">{selectedCompany.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contato RH */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-blue-600" />
                                Contato do RH
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nome do Responsável</label>
                                    <p className="text-gray-900">{selectedCompany.hrContact}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Telefone</label>
                                    <p className="text-gray-900">{selectedCompany.hrPhone}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-500">E-mail</label>
                                    <p className="text-gray-900">{selectedCompany.hrEmail}</p>
                                </div>
                            </div>
                        </div>

                        {/* Vagas Disponíveis */}
                        {selectedCompany.availablePositions && selectedCompany.availablePositions.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                                    Vagas Disponíveis
                                </h4>
                                <ul className="space-y-2">
                                    {selectedCompany.availablePositions.map((position, index) => (
                                        <li key={index} className="flex items-center text-gray-900">
                                            <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                            {position}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Observações */}
                        {selectedCompany.observations && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Observações</h4>
                                <p className="text-gray-900">{selectedCompany.observations}</p>
                            </div>
                        )}

                        {/* Estatísticas */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{selectedCompany.activeUsers || 0}</div>
                                    <div className="text-sm text-gray-600">Usuários Ativos</div>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{selectedCompany.totalHired || 0}</div>
                                    <div className="text-sm text-gray-600">Total Contratados</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Sticky */}
                    <div className="p-6 border-t border-gray-100 bg-white rounded-b-2xl sticky bottom-0 z-10">
                        <button
                            onClick={() => {
                                setShowViewModal(false);
                                setSelectedCompany(null);
                            }}
                            className="w-full bg-gray-600 text-white rounded-xl py-3 px-6 hover:bg-gray-700 transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return activeView === 'register' ? renderCompanyForm() : renderCompaniesList();
    };

    return (
        <div className="space-y-8">
            {/* Content */}
            {renderContent()}

            {/* Modal de Visualização */}
            {renderViewModal()}
        </div>
    );
};

export default CompaniesManagement;
