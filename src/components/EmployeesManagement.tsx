import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail, Calendar, Award, Clock, Lock, AlertCircle } from 'lucide-react';
import { funcionarioService, Funcionario } from '../services/funcionarioService';
import Toast from './Toast';
// @ts-ignore
import { useMask } from '@react-input/mask';

const EmployeesManagement: React.FC = () => {
    const [activeView, setActiveView] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [employees, setEmployees] = useState<Funcionario[]>([]);
    const [loading, setLoading] = useState(false);
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
        observations: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Funcionario | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean, employeeId: number | null }>({ show: false, employeeId: null });

    // Máscaras de input
    const phoneInputRef = useMask({ mask: '(__) _____-____', replacement: { _: /\d/ } });
    const cpfInputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
    const birthDateInputRef = useMask({ mask: '__/__/____', replacement: { _: /\d/ } });
    const admissionDateInputRef = useMask({ mask: '__/__/____', replacement: { _: /\d/ } });

    // Função para formatar moeda brasileira
    const formatCurrency = (value: string): string => {
        // Remove tudo que não é dígito
        const numbers = value.replace(/\D/g, '');

        if (!numbers) return '';

        // Converte para número e divide por 100 para obter centavos
        const amount = parseFloat(numbers) / 100;

        // Formata como moeda brasileira
        return amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    // Função para converter data brasileira (DD/MM/AAAA) para ISO (AAAA-MM-DD)
    const convertDateBRtoISO = (dateBR: string): string => {
        const parts = dateBR.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateBR;
    };

    // Função para converter data ISO (AAAA-MM-DD) para brasileira (DD/MM/AAAA)
    const convertDateISOtoBR = (dateISO: string): string => {
        const parts = dateISO.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateISO;
    };

    // Buscar funcionários ao carregar o componente
    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await funcionarioService.getAll();

            // Converte datas ISO para formato brasileiro na exibição
            const dataWithBRDates = data.map(emp => ({
                ...emp,
                birthDate: emp.birthDate ? convertDateISOtoBR(emp.birthDate) : '',
                admissionDate: emp.admissionDate ? convertDateISOtoBR(emp.admissionDate) : ''
            }));

            setEmployees(dataWithBRDates);
        } catch (error) {
            console.error('Erro ao carregar funcionários:', error);
            setToast({ type: 'error', message: 'Erro ao carregar funcionários. Verifique se o json-server está rodando.' });
        } finally {
            setLoading(false);
        }
    };

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;

        // Aplica formatação de moeda para o campo salary
        if (name === 'salary') {
            formattedValue = formatCurrency(value);
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação de senha apenas para novos cadastros ou quando a senha for alterada
        if (!editingEmployeeId || formData.password) {
            if (formData.password !== formData.confirmPassword) {
                setPasswordError('As senhas não coincidem!');
                return;
            }

            if (formData.password.length < 6) {
                setPasswordError('A senha deve ter no mínimo 6 caracteres!');
                return;
            }
        }

        setPasswordError('');

        try {
            setLoading(true);

            // Remover confirmPassword antes de enviar
            const { confirmPassword, ...funcionarioData } = formData;

            // Converter datas de formato brasileiro para ISO antes de enviar
            const funcionarioDataWithISODates = {
                ...funcionarioData,
                birthDate: convertDateBRtoISO(funcionarioData.birthDate),
                admissionDate: convertDateBRtoISO(funcionarioData.admissionDate)
            };

            if (editingEmployeeId) {
                // Atualizar funcionário existente
                await funcionarioService.update(editingEmployeeId, funcionarioDataWithISODates);
                setToast({ type: 'success', message: 'Funcionário atualizado com sucesso!' });
                setEditingEmployeeId(null);
            } else {
                // Criar novo funcionário
                await funcionarioService.create(funcionarioDataWithISODates);
                setToast({ type: 'success', message: 'Funcionário cadastrado com sucesso!' });
            }

            // Recarregar lista de funcionários
            await loadEmployees();

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
                observations: '',
                password: '',
                confirmPassword: ''
            });

            setActiveView('list');
        } catch (error) {
            console.error('Erro ao cadastrar funcionário:', error);
            setToast({ type: 'error', message: 'Erro ao cadastrar funcionário. Verifique se o json-server está rodando.' });
        } finally {
            setLoading(false);
        }
    };

    // Função para visualizar funcionário
    const handleViewEmployee = (employee: Funcionario) => {
        setSelectedEmployee(employee);
        setShowViewModal(true);
    };

    // Função para editar funcionário
    const handleEditEmployee = (employee: Funcionario) => {
        setEditingEmployeeId(employee.id || null);
        setFormData({
            fullName: employee.fullName,
            email: employee.email,
            phone: employee.phone,
            cpf: employee.cpf,
            rg: employee.rg,
            birthDate: employee.birthDate,
            address: employee.address,
            role: employee.role,
            department: employee.department,
            admissionDate: employee.admissionDate,
            salary: employee.salary,
            workSchedule: employee.workSchedule,
            observations: employee.observations,
            password: '',
            confirmPassword: ''
        });
        setActiveView('register');
    };

    // Função para abrir modal de confirmação de exclusão
    const handleDeleteClick = (id: number | undefined) => {
        if (!id) return;
        setDeleteConfirm({ show: true, employeeId: id });
    };

    // Função para confirmar exclusão de funcionário
    const handleDeleteConfirm = async () => {
        if (!deleteConfirm.employeeId) return;

        try {
            setLoading(true);
            await funcionarioService.delete(deleteConfirm.employeeId);
            await loadEmployees();
            setToast({ type: 'success', message: 'Funcionário excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            setToast({ type: 'error', message: 'Erro ao excluir funcionário. Tente novamente.' });
        } finally {
            setLoading(false);
            setDeleteConfirm({ show: false, employeeId: null });
        }
    };

    // Função para cancelar exclusão
    const handleDeleteCancel = () => {
        setDeleteConfirm({ show: false, employeeId: null });
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
                <div className={`w-16 h-16 bg-gradient-to-br ${editingEmployeeId ? 'from-green-600 to-green-500' : 'from-purple-600 to-purple-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {editingEmployeeId ? <Edit className="w-8 h-8 text-white" /> : <Plus className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {editingEmployeeId ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}
                </h3>
                <p className="text-gray-600">
                    {editingEmployeeId ? 'Atualize as informações do funcionário' : 'Registre informações do funcionário'}
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
                                ref={phoneInputRef}
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
                                ref={cpfInputRef}
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
                                ref={birthDateInputRef}
                                type="text"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                placeholder="DD/MM/AAAA"
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
                                ref={admissionDateInputRef}
                                type="text"
                                name="admissionDate"
                                value={formData.admissionDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                placeholder="DD/MM/AAAA"
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

                {/* Credenciais de Acesso */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                        <Lock className="w-5 h-5 text-indigo-600" />
                        <h4 className="text-xl font-semibold text-gray-900">Credenciais de Acesso</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                placeholder="Digite a senha (mínimo 6 caracteres)"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                placeholder="Digite a senha novamente"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {passwordError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600 font-medium">{passwordError}</p>
                        </div>
                    )}
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
                        className={`flex-1 ${editingEmployeeId ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-xl py-3 px-6 transition-colors flex items-center justify-center space-x-2`}
                    >
                        {editingEmployeeId ? <Edit className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                        <span>{editingEmployeeId ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setActiveView('list');
                            setEditingEmployeeId(null);
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
                                observations: '',
                                password: '',
                                confirmPassword: ''
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

    const renderEmployeesList = () => (
        <div className="space-y-6">
            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <p className="mt-2 text-gray-600">Carregando funcionários...</p>
                </div>
            )}

            {/* Search and Filters */}
            {!loading && <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
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
            </div>}

            {/* Employees Grid */}
            {!loading && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                <span>Admissão: {employee.admissionDate ? new Date(employee.admissionDate).toLocaleDateString('pt-BR') : 'N/A'}</span>
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
                                <button
                                    onClick={() => handleViewEmployee(employee)}
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                                    title="Visualizar"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleEditEmployee(employee)}
                                    className="text-green-600 hover:text-green-900 p-1 rounded"
                                    title="Editar"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(employee.id)}
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
        if (!showViewModal || !selectedEmployee) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                    {/* Header Sticky */}
                    <div className="p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">Detalhes do Funcionário</h3>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    setSelectedEmployee(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                    </div>

                    {/* Conteúdo com scroll */}
                    <div className="p-6 space-y-6 overflow-y-auto flex-1">
                        {/* Informações Pessoais */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
                                Informações Pessoais
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nome Completo</label>
                                    <p className="text-gray-900">{selectedEmployee.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">E-mail</label>
                                    <p className="text-gray-900">{selectedEmployee.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Telefone</label>
                                    <p className="text-gray-900">{selectedEmployee.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">CPF</label>
                                    <p className="text-gray-900">{selectedEmployee.cpf}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">RG</label>
                                    <p className="text-gray-900">{selectedEmployee.rg}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Data de Nascimento</label>
                                    <p className="text-gray-900">{selectedEmployee.birthDate}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-500">Endereço</label>
                                    <p className="text-gray-900">{selectedEmployee.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informações Profissionais */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Award className="w-5 h-5 mr-2 text-blue-600" />
                                Informações Profissionais
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Cargo</label>
                                    <p className="text-gray-900">{selectedEmployee.role}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Departamento</label>
                                    <p className="text-gray-900">{selectedEmployee.department}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Data de Admissão</label>
                                    <p className="text-gray-900">{selectedEmployee.admissionDate}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Horário de Trabalho</label>
                                    <p className="text-gray-900">{selectedEmployee.workSchedule}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Salário</label>
                                    <p className="text-gray-900">{selectedEmployee.salary}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.status || 'Ativo')}`}>
                                        {selectedEmployee.status || 'Ativo'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Observações */}
                        {selectedEmployee.observations && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                                    Observações
                                </h4>
                                <p className="text-gray-900">{selectedEmployee.observations}</p>
                            </div>
                        )}

                        {/* Estatísticas */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{selectedEmployee.evaluationsCount || 0}</div>
                                    <div className="text-sm text-gray-600">Avaliações</div>
                                </div>
                                <div className="bg-green-50 rounded-xl p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600">{selectedEmployee.visitsCount || 0}</div>
                                    <div className="text-sm text-gray-600">Visitas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Sticky */}
                    <div className="p-6 border-t border-gray-100 bg-white rounded-b-2xl sticky bottom-0 z-10">
                        <button
                            onClick={() => {
                                setShowViewModal(false);
                                setSelectedEmployee(null);
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
        return activeView === 'register' ? renderEmployeeForm() : renderEmployeesList();
    };

    return (
        <div className="space-y-8">
            {/* Toast Notification */}
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl max-w-md w-full p-6 mx-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Confirmar Exclusão</h3>
                                <p className="text-sm text-gray-600">Esta ação não pode ser desfeita</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Tem certeza que deseja excluir este funcionário? Todos os dados relacionados serão perdidos.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleDeleteCancel}
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            {renderContent()}

            {/* Modal de Visualização */}
            {renderViewModal()}
        </div>
    );
};

export default EmployeesManagement;