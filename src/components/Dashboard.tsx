import React from 'react';
import { Users, Building, TrendingUp, Clock, CheckCircle, AlertTriangle, Calendar, FileText, UserCheck } from 'lucide-react';

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

  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      message: 'Novo usuário cadastrado: Maria Silva Santos',
      time: '2 horas atrás',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'evaluation',
      message: '1ª Avaliação concluída para João Pedro Lima',
      time: '4 horas atrás',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'placement',
      message: 'Ana Costa encaminhada para Supermercado Central',
      time: '1 dia atrás',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'visit',
      message: 'Visita de acompanhamento realizada na Padaria São José',
      time: '2 dias atrás',
      icon: Calendar,
      color: 'text-red-600'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: '2ª Avaliação - Carlos Eduardo',
      dueDate: 'Hoje',
      priority: 'high',
      type: 'evaluation'
    },
    {
      id: 2,
      task: 'Entrevista com pais - Maria Silva',
      dueDate: 'Amanhã',
      priority: 'medium',
      type: 'interview'
    },
    {
      id: 3,
      task: 'Visita de acompanhamento - Loja Fashion',
      dueDate: '3 dias',
      priority: 'low',
      type: 'visit'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Atividades Recentes</h3>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="text-xl font-semibold text-gray-900">Tarefas Pendentes</h3>
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.task}</p>
                  <p className="text-xs text-gray-500">Prazo: {task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-colors text-left">
            <Users className="w-6 h-6 mb-2" />
            <h4 className="font-medium">Cadastrar Usuário</h4>
            <p className="text-sm opacity-90">Adicionar novo usuário ao sistema</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-colors text-left">
            <FileText className="w-6 h-6 mb-2" />
            <h4 className="font-medium">Nova Avaliação</h4>
            <p className="text-sm opacity-90">Registrar avaliação de experiência</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-colors text-left">
            <Building className="w-6 h-6 mb-2" />
            <h4 className="font-medium">Cadastrar Empresa</h4>
            <p className="text-sm opacity-90">Adicionar nova empresa parceira</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-colors text-left">
            <UserCheck className="w-6 h-6 mb-2" />
            <h4 className="font-medium">Cadastrar Funcionário</h4>
            <p className="text-sm opacity-90">Adicionar novo funcionário</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;