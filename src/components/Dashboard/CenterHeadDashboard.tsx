import React from 'react';
import { Users, Bookmark, Calendar, DollarSign, UserCheck, TrendingUp, AlertCircle as CircleAlert, ClipboardList } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
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
import { 
  MOCK_BATCHES, 
  MOCK_STUDENTS, 
  MOCK_TASKS, 
  MOCK_ATTENDANCE, 
  MOCK_ADMISSIONS 
} from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

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

const CenterHeadDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const centerId = currentUser?.centerId || 'center-3';
  
  // Filter data for this center
  const centerBatches = MOCK_BATCHES.filter(batch => batch.centerId === centerId);
  const centerStudents = MOCK_STUDENTS.filter(student => student.centerId === centerId);
  const centerAttendance = MOCK_ATTENDANCE.filter(record => record.centerId === centerId);
  const centerAdmissions = MOCK_ADMISSIONS.filter(admission => admission.centerId === centerId);
  
  // Calculate today's attendance
  const todayDate = new Date().toISOString().split('T')[0];
  const todayAttendance = centerAttendance.filter(record => record.date === todayDate);
  const attendancePercentage = Math.round((todayAttendance.length / 25) * 100); // Assuming 25 expected attendees
  
  // Data for Batch Distribution chart
  const batchData = [
    { name: 'Active', value: centerBatches.filter(b => b.status === 'active').length },
    { name: 'Upcoming', value: centerBatches.filter(b => b.status === 'upcoming').length },
    { name: 'Completed', value: centerBatches.filter(b => b.status === 'completed').length },
  ];
  
  const COLORS = ['#2563eb', '#f59e0b', '#10b981'];
  
  // Revenue data (mock)
  const revenueData = [
    { month: 'Jan', revenue: 42000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 45000 },
    { month: 'Apr', revenue: 55000 },
    { month: 'May', revenue: 65000 },
    { month: 'Jun', revenue: 78000 },
  ];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Center Head Dashboard</h1>
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
          title="Total Students" 
          value={centerStudents.length}
          icon={<Users className="h-6 w-6 text-primary-600" />} 
          change="+5% from last month" 
          positive={true} 
        />
        <StatCard 
          title="Active Batches" 
          value={centerBatches.filter(b => b.status === 'active').length}
          icon={<Calendar className="h-6 w-6 text-primary-600" />} 
        />
        <StatCard 
          title="Today's Attendance" 
          value={`${attendancePercentage}%`}
          icon={<UserCheck className="h-6 w-6 text-primary-600" />} 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$78,000" 
          icon={<DollarSign className="h-6 w-6 text-primary-600" />} 
          change="+12% from last month" 
          positive={true} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Batch Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={batchData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {batchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip 
                  formatter={(value: number) => [`${value} batches`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Admissions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {centerAdmissions.slice(0, 5).map((admission) => (
                  <tr key={admission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {admission.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {admission.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(admission.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        admission.status === 'confirmed' ? 'bg-success-100 text-success-800' : 
                        admission.status === 'pending' ? 'bg-warning-100 text-warning-800' : 
                        'bg-error-100 text-error-800'
                      }`}>
                        {admission.status.charAt(0).toUpperCase() + admission.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-outline">View All Admissions</button>
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Alerts & Notifications</h2>
          <div className="space-y-4">
            <div className="flex p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <CircleAlert className="h-5 w-5 text-warning-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-warning-800">Low attendance in Data Science batch</p>
                <p className="text-xs text-warning-600 mt-1">Only 65% attendance recorded yesterday</p>
              </div>
            </div>
            <div className="flex p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <Bookmark className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary-800">New course starting next week</p>
                <p className="text-xs text-primary-600 mt-1">Python Programming begins on July 15</p>
              </div>
            </div>
            <div className="flex p-4 bg-success-50 border border-success-200 rounded-lg">
              <Users className="h-5 w-5 text-success-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-success-800">Batch capacity reached</p>
                <p className="text-xs text-success-600 mt-1">Mobile App Development batch is now full</p>
              </div>
            </div>
            <div className="flex p-4 bg-error-50 border border-error-200 rounded-lg">
              <ClipboardList className="h-5 w-5 text-error-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-error-800">Overdue task</p>
                <p className="text-xs text-error-600 mt-1">Monthly report submission deadline was yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Active Batches</h2>
          <button className="btn btn-outline text-sm">Manage Batches</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {centerBatches.map((batch) => (
                <tr key={batch.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {batch.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.scheduleDetails}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.enrolled}/{batch.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      batch.status === 'active' ? 'bg-success-100 text-success-800' : 
                      batch.status === 'upcoming' ? 'bg-primary-100 text-primary-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CenterHeadDashboard;