import React, { useState, useEffect } from 'react';
import { Users, Building, BarChart3, Menu, X, UserCheck, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import UsersManagement from './components/UsersManagement';
import CompaniesManagement from './components/CompaniesManagement';
import EmployeesManagement from './components/EmployeesManagement';
import Login from './components/Login';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { logout, restoreSession } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Restaurar sessão do localStorage ao carregar o app
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'text-blue-600' },
    { id: 'users', label: 'Usuários', icon: Users, color: 'text-red-600' },
    { id: 'companies', label: 'Empresas', icon: Building, color: 'text-green-600' },
    { id: 'employees', label: 'Funcionários', icon: UserCheck, color: 'text-purple-600' }
  ];

  const handleLogout = () => {
    dispatch(logout());
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersManagement />;
      case 'companies':
        return <CompaniesManagement />;
      case 'employees':
        return <EmployeesManagement />;
      default:
        return <Dashboard />;
    }
  };

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Gestão</h1>
                <p className="text-sm text-gray-500">Acompanhamento e Avaliação</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Info - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{currentUser?.fullName || currentUser?.email}</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gray-100 text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              {/* User Info - Mobile */}
              <div className="flex items-center space-x-2 px-4 py-3 mb-2 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{currentUser?.fullName || currentUser?.email}</span>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}

                {/* Logout Button - Mobile */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sair</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;