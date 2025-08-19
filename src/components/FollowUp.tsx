import React, { useState } from 'react';
import { MapPin, Calendar, Building, User, FileText } from 'lucide-react';

const FollowUp: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [hrInterviewed, setHrInterviewed] = useState('');
  const [generalAssessment, setGeneralAssessment] = useState('');
  const [observations, setObservations] = useState('');
  const [punctuality, setPunctuality] = useState('');
  const [integration, setIntegration] = useState('');
  const [relationships, setRelationships] = useState('');
  const [taskPerformance, setTaskPerformance] = useState('');
  
  const placedUsers = [
    { id: '1', name: 'Ana Costa Ferreira - Supermercado Central' },
    { id: '2', name: 'Carlos Eduardo - Padaria São José' },
    { id: '3', name: 'Maria Silva Santos - Loja Fashion' }
  ];

  const performanceOptions = ['Excelente', 'Muito Bom', 'Bom', 'Regular', 'Insuficiente'];
  
  const recentVisits = [
    {
      id: 1,
      user: 'Ana Costa Ferreira',
      company: 'Supermercado Central',
      date: '2024-01-15',
      hrContact: 'Sandra Oliveira',
      assessment: 'Muito Bom'
    },
    {
      id: 2,
      user: 'Carlos Eduardo',
      company: 'Padaria São José',
      date: '2024-01-10',
      hrContact: 'Roberto Silva',
      assessment: 'Excelente'
    },
    {
      id: 3,
      user: 'José Santos',
      company: 'Loja de Roupas Fashion',
      date: '2024-01-05',
      hrContact: 'Maria Fernandes',
      assessment: 'Bom'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Visita registrada:', {
      user: selectedUser,
      date: visitDate,
      hrInterviewed,
      generalAssessment,
      observations,
      punctuality,
      integration,
      relationships,
      taskPerformance
    });
  };

  const getAssessmentColor = (assessment: string) => {
    switch (assessment) {
      case 'Excelente': return 'text-green-700 bg-green-100';
      case 'Muito Bom': return 'text-green-600 bg-green-50';
      case 'Bom': return 'text-blue-600 bg-blue-50';
      case 'Regular': return 'text-yellow-600 bg-yellow-50';
      case 'Insuficiente': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Acompanhamento Pós-Encaminhamento</h2>
        <p className="text-gray-600">
          Registre visitas às empresas e acompanhe o desempenho dos usuários no trabalho
        </p>
      </div>

      {/* Nova Visita */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-900">Registrar Nova Visita</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário/Empresa</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              >
                <option value="">Selecione o usuário</option>
                {placedUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data da Visita</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsável RH Entrevistado</label>
              <input
                type="text"
                value={hrInterviewed}
                onChange={(e) => setHrInterviewed(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          {/* Avaliação de Desempenho */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-green-600" />
              <h4 className="text-lg font-semibold text-gray-900">Avaliação de Desempenho</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pontualidade</label>
                <select
                  value={punctuality}
                  onChange={(e) => setPunctuality(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Selecione</option>
                  {performanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Integração com Equipe</label>
                <select
                  value={integration}
                  onChange={(e) => setIntegration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Selecione</option>
                  {performanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relacionamento Interpessoal</label>
                <select
                  value={relationships}
                  onChange={(e) => setRelationships(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Selecione</option>
                  {performanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Execução de Tarefas</label>
                <select
                  value={taskPerformance}
                  onChange={(e) => setTaskPerformance(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                >
                  <option value="">Selecione</option>
                  {performanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Parecer Geral */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parecer Geral</label>
              <select
                value={generalAssessment}
                onChange={(e) => setGeneralAssessment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              >
                <option value="">Selecione o parecer geral</option>
                {performanceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observações Detalhadas</label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                placeholder="Descreva detalhes sobre o desempenho, feedback recebido, dificuldades identificadas, progressos observados e recomendações..."
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 text-white rounded-xl py-3 px-6 hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Registrar Visita</span>
            </button>
          </div>
        </form>
      </div>

      {/* Histórico de Visitas */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-5 h-5 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-900">Histórico de Visitas</h3>
        </div>
        
        <div className="space-y-4">
          {recentVisits.map((visit) => (
            <div key={visit.id} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{visit.user}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAssessmentColor(visit.assessment)}`}>
                      {visit.assessment}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{visit.company}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(visit.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{visit.hrContact}</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors text-sm">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowUp;