import React, { useState } from 'react';
import { MessageCircle, Users, Heart, Shield } from 'lucide-react';

const ParentInterview: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [summary, setSummary] = useState('');
  const [familyParticipation, setFamilyParticipation] = useState('');
  const [supportLevel, setSupportLevel] = useState('');
  const [autonomyEncouragement, setAutonomyEncouragement] = useState('');
  const [overprotectionSigns, setOverprotectionSigns] = useState('');
  
  const users = [
    { id: '1', name: 'Maria Silva Santos' },
    { id: '2', name: 'João Pedro Lima' },
    { id: '3', name: 'Ana Costa Ferreira' },
    { id: '4', name: 'Carlos Eduardo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Entrevista registrada:', {
      user: selectedUser,
      date: interviewDate,
      interviewer,
      summary,
      familyParticipation,
      supportLevel,
      autonomyEncouragement,
      overprotectionSigns
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Entrevistas com Pais/Responsáveis</h2>
        <p className="text-gray-600">
          Registre informações sobre participação e apoio familiar no desenvolvimento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Informações da Entrevista</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              >
                <option value="">Selecione o usuário</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data da Entrevista</label>
              <input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Entrevistador</label>
              <input
                type="text"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Nome do profissional responsável"
              />
            </div>
          </div>
        </div>

        {/* Resumo da Entrevista */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Resumo da Entrevista</h3>
          </div>
          
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
            placeholder="Descreva os principais tópicos abordados durante a entrevista, preocupações dos pais, expectativas e questões relevantes..."
          />
        </div>

        {/* Avaliação da Participação Familiar */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Heart className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Participação e Apoio Familiar</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Participação da Família
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['Alto', 'Médio', 'Baixo'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFamilyParticipation(level)}
                    className={`p-3 rounded-xl font-medium transition-all ${
                      familyParticipation === level
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parecer sobre Participação e Incentivo Familiar
              </label>
              <textarea
                value={supportLevel}
                onChange={(e) => setSupportLevel(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
                placeholder="Descreva como a família participa e incentiva o desenvolvimento do usuário..."
              />
            </div>
          </div>
        </div>

        {/* Autonomia e Superproteção */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Autonomia e Proteção</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estímulo à Autonomia
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {['Muito Bom', 'Bom', 'Regular', 'Insuficiente'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setAutonomyEncouragement(level)}
                    className={`p-3 rounded-xl font-medium transition-all ${
                      autonomyEncouragement === level
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registros de Superproteção ou Apoio à Autonomia
              </label>
              <textarea
                value={overprotectionSigns}
                onChange={(e) => setOverprotectionSigns(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                placeholder="Identifique sinais de superproteção ou comportamentos que estimulam a autonomia. Inclua recomendações para a família..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-600 text-white rounded-xl py-4 px-8 hover:bg-red-700 transition-colors flex items-center space-x-2 text-lg font-medium"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Salvar Entrevista</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParentInterview;