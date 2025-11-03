import React, { useState, useEffect } from 'react';
import { User, Phone, FileText, Save, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { Usuario } from '../services/usuarioService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createUsuario, updateUsuario, clearError } from '../store/slices/usuariosSlice';

type UserRegistrationProps = {
  mode?: "edit" | "create";
  user?: Usuario;
  onCancel?: () => void;
  onSave?: (user: Usuario) => void;
};

const UserRegistration: React.FC<UserRegistrationProps> = ({
  mode = "create",
  user = null,
  onCancel,
  onSave
}) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.usuarios);

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    rg: '',
    cpf: '',
    address: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    emergencyContact: '',
    admissionDate: '',
    observations: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Preencher formulário quando em modo de edição
  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        fullName: user.fullName || '',
        birthDate: user.birthDate || '',
        rg: user.rg || '',
        cpf: user.cpf || '',
        address: user.address || '',
        phone: user.phone || '',
        parentName: user.parentName || '',
        parentPhone: user.parentPhone || '',
        emergencyContact: user.emergencyContact || '',
        admissionDate: user.admissionDate || '',
        observations: user.observations || ''
      });
    }
  }, [mode, user]);

  // Efeito para exibir erros do Redux
  useEffect(() => {
    if (error) {
      setMessage({ type: 'error', text: error });
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar mensagens ao editar
    if (message) setMessage(null);
    if (error) dispatch(clearError());
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'O nome completo é obrigatório' });
      return false;
    }
    if (!formData.cpf.trim()) {
      setMessage({ type: 'error', text: 'O CPF é obrigatório' });
      return false;
    }
    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: 'O telefone é obrigatório' });
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

    try {
      if (mode === "edit" && user?.id) {
        const result = await dispatch(updateUsuario({ id: user.id, data: formData })).unwrap();
        setMessage({ type: 'success', text: 'Usuário atualizado com sucesso!' });
        if (onSave) {
          onSave(result);
        }
      } else {
        await dispatch(createUsuario(formData)).unwrap();
        setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' });

        // Limpar formulário após cadastro
        setTimeout(() => {
          setFormData({
            fullName: '',
            birthDate: '',
            rg: '',
            cpf: '',
            address: '',
            phone: '',
            parentName: '',
            parentPhone: '',
            emergencyContact: '',
            admissionDate: '',
            observations: ''
          });
          setMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      setMessage({
        type: 'error',
        text: mode === "edit" ? 'Erro ao atualizar usuário' : 'Erro ao cadastrar usuário'
      });
    }
  };

  const handleNew = () => {
    setFormData({
      fullName: '',
      birthDate: '',
      rg: '',
      cpf: '',
      address: '',
      phone: '',
      parentName: '',
      parentPhone: '',
      emergencyContact: '',
      admissionDate: '',
      observations: ''
    });
    setMessage(null);
    dispatch(clearError());
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {mode !== "edit" && (
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Cadastro de Usuários</h2>
          <p className="text-gray-600">
            Registre as informações pessoais e familiares dos novos usuários
          </p>
        </div>
      )}

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
        {/* Informações Pessoais */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <User className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Informações Pessoais</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Digite o nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">RG</label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="000.000.000-0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="000.000.000-00"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço Completo</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="Rua, número, bairro, cidade, CEP"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Ingresso</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Informações Familiares */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Phone className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Informações Familiares</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Nome do pai/mãe ou responsável"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do Responsável</label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contato de Emergência</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="Nome e telefone para emergências"
              />
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Observações Iniciais</h3>
          </div>
          
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
            placeholder="Registre observações importantes sobre o usuário, necessidades especiais, medicações, etc."
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-red-600 text-white rounded-xl py-3 px-6 hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="w-5 h-5" />
            <span>
              {loading
                ? 'Salvando...'
                : mode === "edit"
                ? "Atualizar Cadastro"
                : "Salvar Cadastro"}
            </span>
          </button>

          {mode === "edit" ? (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="bg-gray-600 text-white rounded-xl py-3 px-6 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNew}
              disabled={loading}
              className="bg-green-600 text-white rounded-xl py-3 px-6 hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span>Novo</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;