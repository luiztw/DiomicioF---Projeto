import React, { useState, useEffect } from 'react';
import { LogIn, User, Lock, Eye, EyeOff, BarChart3, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, clearError } from '../store/slices/authSlice';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    // Limpar erro do Redux ao desmontar
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = 'O email é obrigatório';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'A senha é obrigatória';
            isValid = false;
        } else if (password.length < 4) {
            newErrors.password = 'A senha deve ter pelo menos 4 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(clearError());
            dispatch(login({ email, password }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gestão</h1>
                    <p className="text-gray-600">Acompanhamento e Avaliação</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo</h2>
                        <p className="text-gray-600">Entre com suas credenciais para acessar o sistema</p>
                    </div>

                    {/* Error from Redux */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <span className="text-sm text-red-800">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ ...errors, email: '' });
                                        if (error) dispatch(clearError());
                                    }}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } focus:ring-2 transition-all`}
                                    placeholder="Digite seu email"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors({ ...errors, password: '' });
                                    }}
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.password
                                            ? 'border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } focus:ring-2 transition-all`}
                                    placeholder="Digite sua senha"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                />
                                <span className="text-sm text-gray-700">Lembrar de mim</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Esqueceu a senha?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl py-3 px-6 hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Entrando...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Entrar</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem uma conta?{' '}
                            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                Entre em contato
                            </button>
                        </p>
                    </div>
                </div>

                {/* Info Text */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Sistema protegido. Acesso apenas para usuários autorizados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
