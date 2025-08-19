import React, { useState } from 'react';
import { Briefcase, Building, Phone, Calendar, CheckCircle } from 'lucide-react';

const WorkPlacement: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [hrContact, setHrContact] = useState('');
  const [hrPhone, setHrPhone] = useState('');
  const [expectedEndDate, setExpectedEndDate] = useState('');
  const [status, setStatus] = useState('Em Experiência');
  
  const users = [
    { id: '1', name: 'Maria Silva Santos' },
    { id: '2', name: 'João Pedro Lima' },
    { id: '3', name: 'Ana Costa Ferreira' },
    { id: '4', name: 'Carlos Eduardo' }
  ];

  const statusOptions = [
    { value: 'Em Experiência', color: 'bg-yellow-500' },
    { value: 'Ativo', color: 'bg-green-500' },
    { value: 'Desligado', color: 'bg-red-500' }
  ];

  const placedUsers = [
    {
      id: 1,
      name: 'Ana Costa Ferreira',
      company: 'Supermercado Central',
      position: 'Auxiliar de Limpeza',
      status: 'Ativo',
      admissionDate: '2024-01-10',
      hrContact: 'Sandra Oliveira'
    },
    {
      id: 2,
      name: 'Carlos Eduardo',
      company: 'Padaria São José',
      position: 'Auxiliar de Produção',
      status: 'Em Experiência',
      admissionDate: '2024-01-20',
      hrContact: 'Roberto Silva'
    },
    {
      id: 3,
      name: 'José Santos',
      company: 'Loja de Roupas Fashion',
      position: 'Organizador de Estoque',
      status: 'Desligado',
      admissionDate: '2023-11-15',
      hrContact: 'Maria Fernandes'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Encaminhamento registrado:', {
      user: selectedUser,
      company,
      position,
      admissionDate,
      hrContact,
      hrPhone,
      expectedEndDate,
      status
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Em Experiência': return 'bg-yellow-100 text-yellow-800';
      case 'Desligado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Encaminhamento para o Trabalho</h2>
        <p className="text-gray-600">
          Gerencie encaminhamentos e acompanhe usuários no mercado de trabalho
        </p>
      </div>

      {/* Novo Encaminhamento */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Novo Encaminhamento</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              >
                <option value="">Selecione o usuário</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Nome da empresa contratante"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Função/Cargo</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Cargo ou função exercida"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
              <input
                type="date"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contato no RH</label>
              <input
                type="text"
                value={hrContact}
                onChange={(e) => setHrContact(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Nome do responsável no RH"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do RH</label>
              <input
                type="tel"
                value={hrPhone}
                onChange={(e) => setHrPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provável Data de Desligamento</label>
              <input
                type="date"
                value={expectedEndDate}
                onChange={(e) => setExpectedEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="flex space-x-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setStatus(option.value)}
                    className={`flex-1 p-3 rounded-xl text-white font-medium transition-all ${
                      status === option.value 
                        ? `${option.color} shadow-lg` 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {option.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-xl py-3 px-6 hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Registrar Encaminhamento</span>
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Encaminhados */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Building className="w-5 h-5 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-900">Usuários Encaminhados</h3>
        </div>
        
        <div className="space-y-4">
          {placedUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{user.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.position}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(user.admissionDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{user.hrContact}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors text-sm">
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPlacement;