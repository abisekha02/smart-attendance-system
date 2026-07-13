import React from 'react';
import { 
  Users, 
  Book, 
  Building,
  DollarSign, 
  UserCheck, 
  LineChart, 
  BarChart4, 
  TrendingUp 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ResponsiveContainer 
} from 'recharts';
import { MOCK_CHART_DATA } from '../../data/mockData';

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
        <div className="p-3 bg-primary-50 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const chartData = MOCK_CHART_DATA.slice(-14); // Last 14 days
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <select className="form-input py-1 px-2 text-sm">
            <option value="all">All Centers</option>
            <option value="center-1">Downtown Center</option>
            <option value="center-2">Uptown Center</option>
            <option value="center-3">West Side Center</option>
            <option value="center-4">East Side Center</option>
            <option value="center-5">South End Center</option>
          </select>
          <button className="btn btn-primary">Export Report</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="856" 
          icon={<Users className="h-6 w-6 text-primary-600" />} 
          change="+12% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Active Courses" 
          value="24" 
          icon={<Book className="h-6 w-6 text-primary-600" />} 
          change="+3 new courses" 
          positive={true} 
        />
        <StatCard 
          title="Total Centers" 
          value="5" 
          icon={<Building className="h-6 w-6 text-primary-600" />} 
        />
        <StatCard 
          title="Revenue (MTD)" 
          value="$65,890" 
          icon={<DollarSign className="h-6 w-6 text-primary-600" />} 
          change="+8.2% from last month" 
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
              <RechartsLineChart data={chartData}>
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
                  stroke="#2563eb" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Revenue Analysis</h2>
            <select className="form-input py-1 px-2 text-sm">
              <option value="14d">Last 14 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Center Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Downtown Center</span>
                <span className="text-sm font-medium text-gray-700">92%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-success-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Uptown Center</span>
                <span className="text-sm font-medium text-gray-700">85%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">West Side Center</span>
                <span className="text-sm font-medium text-gray-700">78%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">East Side Center</span>
                <span className="text-sm font-medium text-gray-700">65%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-warning-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">South End Center</span>
                <span className="text-sm font-medium text-gray-700">53%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-error-500 rounded-full" style={{ width: '53%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New student enrolled</p>
                <p className="text-sm text-gray-500">Alex Smith enrolled in Full Stack Web Development</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Payment received</p>
                <p className="text-sm text-gray-500">Jamie Johnson paid $2,000 for Data Science course</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                <Book className="h-5 w-5 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">New course added</p>
                <p className="text-sm text-gray-500">UI/UX Design course added to West Side Center</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-warning-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Center head added</p>
                <p className="text-sm text-gray-500">New center head assigned to South End Center</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;