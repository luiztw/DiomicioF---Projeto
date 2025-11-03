import React, { useState, useEffect } from 'react';
import { ClipboardCheck, User, Calendar, FileSignature, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsuarios } from '../store/slices/usuariosSlice';
import { createAvaliacao, clearError } from '../store/slices/avaliacoesSlice';

const TrialPeriod: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usuarios } = useAppSelector((state) => state.usuarios);
  const { loading, error } = useAppSelector((state) => state.avaliacoes);

  const [selectedUser, setSelectedUser] = useState('');
  const [evaluationType, setEvaluationType] = useState<'first' | 'second'>('first');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);
  const [responses, setResponses] = useState<{[key: number]: string}>({});
  const [observations, setObservations] = useState('');
  const [evaluator, setEvaluator] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Carregar usuários ao montar o componente
  useEffect(() => {
    dispatch(fetchUsuarios());
  }, [dispatch]);

  // Efeito para exibir erros do Redux
  useEffect(() => {
    if (error) {
      setMessage({ type: 'error', text: error });
    }
  }, [error]);

  const questions = [
    'Demonstra interesse pelas atividades propostas?',
    'Participa ativamente das dinâmicas de grupo?',
    'Apresenta pontualidade e assiduidade?',
    'Mantém relacionamento respeitoso com colegas?',
    'Segue orientações dos professores/instrutores?',
    'Demonstra autonomia para tarefas básicas?',
    'Apresenta iniciativa para resolver problemas?',
    'Mantém organização pessoal e do ambiente?',
    'Demonstra controle emocional adequado?',
    'Apresenta potencial para atividades laborais?'
  ];

  const responseOptions = [
    { value: 'sim', label: 'Sim', color: 'bg-green-600' },
    { value: 'maioria', label: 'Maioria das vezes', color: 'bg-green-400' },
    { value: 'raras', label: 'Raras vezes', color: 'bg-yellow-500' },
    { value: 'nao', label: 'Não', color: 'bg-red-600' }
  ];

  const handleResponseChange = (questionIndex: number, value: string) => {
    setResponses(prev => ({ ...prev, [questionIndex]: value }));
  };

  const validateForm = (): boolean => {
    if (!selectedUser) {
      setMessage({ type: 'error', text: 'Selecione um usuário' });
      return false;
    }
    if (!evaluator.trim()) {
      setMessage({ type: 'error', text: 'Informe o nome do avaliador' });
      return false;
    }
    if (Object.keys(responses).length < questions.length) {
      setMessage({ type: 'error', text: 'Responda todas as questões' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setMessage(null);
    dispatch(clearError());

    const usuarioSelecionado = usuarios.find(u => u.id === selectedUser);
    if (!usuarioSelecionado) {
      setMessage({ type: 'error', text: 'Usuário não encontrado' });
      return;
    }

    try {
      await dispatch(createAvaliacao({
        usuarioId: selectedUser,
        usuarioNome: usuarioSelecionado.fullName,
        tipoAvaliacao: evaluationType,
        dataAvaliacao: evaluationDate,
        respostas: responses,
        observacoes: observations,
        avaliador: evaluator
      })).unwrap();

      setMessage({ type: 'success', text: 'Avaliação cadastrada com sucesso!' });

      // Limpar formulário após sucesso
      setTimeout(() => {
        setSelectedUser('');
        setEvaluationType('first');
        setEvaluationDate(new Date().toISOString().split('T')[0]);
        setResponses({});
        setObservations('');
        setEvaluator('');
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      setMessage({ type: 'error', text: 'Erro ao cadastrar avaliação' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Período de Experiência</h2>
        <p className="text-gray-600">
          Registre as avaliações de desempenho durante o período de experiência
        </p>
      </div>

      {/* Mensagem de Feedback */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center space-x-3 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações da Avaliação */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Informações da Avaliação</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuário *</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Avaliação</label>
              <select
                value={evaluationType}
                onChange={(e) => setEvaluationType(e.target.value as 'first' | 'second')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              >
                <option value="first">1ª Avaliação</option>
                <option value="second">2ª Avaliação</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data da Avaliação</label>
              <input
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Questionário de Avaliação */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Questionário de Avaliação</h3>
          </div>
          
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-4">
                  {index + 1}. {question}
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {responseOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleResponseChange(index, option.value)}
                      className={`p-3 rounded-xl text-white font-medium transition-all hover:scale-105 ${
                        responses[index] === option.value 
                          ? `${option.color} shadow-lg` 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Observações e Parecer */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <FileSignature className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Observações e Parecer</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações Detalhadas
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all resize-none"
                placeholder="Descreva comportamentos específicos, progressos observados, dificuldades identificadas e recomendações..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliador Responsável *
              </label>
              <input
                type="text"
                value={evaluator}
                onChange={(e) => setEvaluator(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Nome completo do professor/avaliador"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-green-600 text-white rounded-xl py-4 px-8 hover:bg-green-700 transition-colors flex items-center space-x-2 text-lg font-medium ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ClipboardCheck className="w-6 h-6" />
            <span>{loading ? 'Salvando...' : 'Salvar Avaliação'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrialPeriod;