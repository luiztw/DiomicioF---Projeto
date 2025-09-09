import React from 'react';
import { Users, Building, Clock, CheckCircle, UserCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Usuários',
      value: '127',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Empresas Parceiras',
      value: '34',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      title: 'Em Experiência',
      value: '23',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Encaminhados',
      value: '89',
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'Funcionários Ativos',
      value: '12',
      icon: UserCheck,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Dashboard</h2>
        <p className="text-gray-600">
          Visão geral do sistema de acompanhamento e avaliação
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;