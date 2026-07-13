import React from 'react';
import { 
  Users, 
  DollarSign, 
  Award, 
  BarChart3,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { MOCK_CHART_DATA, MOCK_INCENTIVES, MOCK_TARGETS } from '../../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {change && (
            <div className="mt-2 flex items-center">
              {positive ? (
                <TrendingUp className="h-4 w-4 text-success-500 mr-1" />
              ) : (
                <TrendingUp className="h-4 w-4 text-error-500 mr-1 transform rotate-180" />
              )}
              <span className={`text-sm ${positive ? 'text-success-600' : 'text-error-600'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-accent-50 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

const MarketingDashboard: React.FC = () => {
  const chartData = MOCK_CHART_DATA.slice(-14); // Last 14 days
  
  // Piedata for course distribution
  const pieData = [
    { name: 'Web Development', value: 45 },
    { name: 'Data Science', value: 25 },
    { name: 'UI/UX Design', value: 15 },
    { name: 'Mobile App Dev', value: 10 },
    { name: 'Python Programming', value: 5 },
  ];
  
  const COLORS = ['#2563eb', '#0d9488', '#f97316', '#10b981', '#f59e0b'];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Marketing Executive Dashboard</h1>
        <div className="flex space-x-2">
          <select className="form-input py-1 px-2 text-sm">
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-quarter">This Quarter</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Admissions" 
          value="32" 
          icon={<Users className="h-6 w-6 text-accent-600" />} 
          change="+8% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Monthly Target" 
          value="45 / 60" 
          icon={<BarChart3 className="h-6 w-6 text-accent-600" />}
        />
        <StatCard 
          title="Total Incentives" 
          value="$820" 
          icon={<DollarSign className="h-6 w-6 text-accent-600" />} 
          change="+12% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Conversion Rate" 
          value="68%" 
          icon={<Award className="h-6 w-6 text-accent-600" />} 
          change="+5% from last month" 
          positive={true} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Admissions Trend</h2>
            <select className="form-input py-1 px-2 text-sm">
              <option value="14d">Last 14 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value} admissions`, 'Admissions']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="admissions" 
                  stroke="#f97316" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Course Distribution</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Incentives</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_INCENTIVES.map((incentive) => (
                  <tr key={incentive.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {incentive.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${incentive.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${incentive.status === 'paid' ? 'bg-success-100 text-success-800' : 
                        incentive.status === 'approved' ? 'bg-primary-100 text-primary-800' : 
                        'bg-warning-100 text-warning-800'}`}>
                        {incentive.status.charAt(0).toUpperCase() + incentive.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(incentive.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Targets</h2>
          <div className="space-y-6">
            {MOCK_TARGETS.filter(target => target.role === 'marketing').map((target) => (
              <div key={target.id}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{target.targetType === 'admissions' ? 'Admissions Target' : 'Revenue Target'}</p>
                    <p className="text-xs text-gray-500">{target.month} {target.year}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">
                      {target.targetType === 'admissions' ? 
                        `${target.achievedValue}/${target.targetValue} students` : 
                        `$${target.achievedValue.toLocaleString()}/$${target.targetValue.toLocaleString()}`
                      }
                    </p>
                    {target.status === 'achieved' && <CheckCircle className="ml-2 h-4 w-4 text-success-500" />}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${
                      target.progress >= 100 ? 'bg-success-500' : 
                      target.progress >= 70 ? 'bg-primary-500' : 
                      target.progress >= 50 ? 'bg-warning-500' : 
                      'bg-error-500'
                    }`} 
                    style={{ width: `${Math.min(target.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-primary">New Admission</button>
              <button className="btn btn-outline">View All Targets</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;