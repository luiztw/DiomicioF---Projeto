import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsuarios } from '../store/slices/usuariosSlice';
import { createWorkPlacement } from '../store/slices/workPlacementsSlice';

const WorkPlacement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usuarios } = useAppSelector((state) => state.usuarios);
  const { loading } = useAppSelector((state) => state.workPlacements);

  const [selectedUser, setSelectedUser] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [hrContact, setHrContact] = useState('');
  const [hrPhone, setHrPhone] = useState('');
  const [expectedEndDate, setExpectedEndDate] = useState('');
  const [status, setStatus] = useState('Em Experiência');

  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  const statusOptions = [
    { value: 'Em Experiência', color: 'bg-yellow-500' },
    { value: 'Ativo', color: 'bg-green-500' },
    { value: 'Desligado', color: 'bg-red-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUser || !company || !position || !admissionDate) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const usuario = usuarios.find(u => u.id === selectedUser);
    if (!usuario) {
      alert('Usuário não encontrado');
      return;
    }

    try {
      await dispatch(createWorkPlacement({
        usuarioId: selectedUser,
        usuarioNome: usuario.fullName,
        empresa: company,
        cargo: position,
        dataAdmissao: admissionDate,
        contatoRH: hrContact,
        telefoneRH: hrPhone,
        dataProvaveDesligamento: expectedEndDate,
        status: status
      })).unwrap();

      alert('Encaminhamento registrado com sucesso!');

      // Limpar formulário
      setSelectedUser('');
      setCompany('');
      setPosition('');
      setAdmissionDate('');
      setHrContact('');
      setHrPhone('');
      setExpectedEndDate('');
      setStatus('Em Experiência');
    } catch (error) {
      alert('Erro ao registrar encaminhamento. Tente novamente.');
      console.error('Erro ao registrar encaminhamento:', error);
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
                required
              >
                <option value="">Selecione o usuário</option>
                {usuarios.map(user => (
                  <option key={user.id} value={user.id}>{user.fullName}</option>
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
                required
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
              <input
                type="date"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
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
              disabled={loading}
              className="bg-green-600 text-white rounded-xl py-3 px-6 hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{loading ? 'Salvando...' : 'Registrar Encaminhamento'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkPlacement;