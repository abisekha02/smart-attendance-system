import React, { useState } from 'react';
import { 
  ClipboardList, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2,
  Camera,
  TrendingUp 
} from 'lucide-react';
import { format } from 'date-fns';
import { MOCK_TASKS, MOCK_ATTENDANCE } from '../../data/mockData';
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
        <div className="p-3 bg-secondary-50 rounded-md">
          {icon}
        </div>
      </div>
    </div>
  );
};

const AttendanceCard: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const currentUser = useAuth().currentUser;
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const handleCheckIn = () => {
    setShowCamera(true);
  };
  
  const handleCapture = () => {
    // Simulate capture
    setShowCamera(false);
    setCheckedIn(true);
  };
  
  const handleCheckOut = () => {
    setCheckedIn(false);
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Attendance</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-secondary-500 mr-2" />
          <span className="text-sm font-medium">{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${checkedIn ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>
          {checkedIn ? 'Checked In' : 'Not Checked In'}
        </div>
      </div>
      
      {showCamera ? (
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500 mt-2">Camera preview would appear here</p>
          </div>
          <div className="flex justify-between">
            <button 
              className="btn btn-outline"
              onClick={() => setShowCamera(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleCapture}
            >
              Capture & Check In
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-700">Current Location</p>
              <p className="text-xs text-gray-500">123 Business Center, New York, NY</p>
            </div>
          </div>
          
          {!checkedIn ? (
            <button 
              className="btn btn-primary w-full"
              onClick={handleCheckIn}
            >
              <UserCheck className="h-5 w-5 mr-2" />
              Check In Now
            </button>
          ) : (
            <button 
              className="btn btn-outline w-full border-error-300 text-error-600 hover:bg-error-50"
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const EmployeeDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const employeeTasks = MOCK_TASKS.filter(task => task.assigneeId === 'employee-1');
  const employeeAttendance = MOCK_ATTENDANCE.filter(record => record.userId === 'employee-1');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Dashboard</h1>
        <div className="text-sm text-gray-500">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Tasks Assigned" 
          value={employeeTasks.length}
          icon={<ClipboardList className="h-6 w-6 text-secondary-600" />} 
        />
        <StatCard 
          title="Tasks Completed" 
          value={employeeTasks.filter(t => t.status === 'completed').length}
          icon={<CheckCircle2 className="h-6 w-6 text-secondary-600" />} 
        />
        <StatCard 
          title="Attendance Rate" 
          value="96%" 
          icon={<UserCheck className="h-6 w-6 text-secondary-600" />} 
          change="+2% from last month" 
          positive={true} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttendanceCard />
        
        <div className="card p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">My Tasks</h2>
          <div className="space-y-4">
            {employeeTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-success-100 text-success-800' : 
                    task.status === 'in_progress' ? 'bg-primary-100 text-primary-800' : 
                    'bg-warning-100 text-warning-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">
                      Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {task.status !== 'completed' && (
                      <button className="btn btn-outline py-1 px-3 text-xs">
                        Mark as Complete
                      </button>
                    )}
                    <button className="btn btn-primary py-1 px-3 text-xs">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-outline">View All Tasks</button>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Attendance History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeAttendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {format(new Date(record.date), 'EEEE, MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(record.checkInTime), 'h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkOutTime ? format(new Date(record.checkOutTime), 'h:mm a') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.location.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'present' ? 'bg-success-100 text-success-800' : 
                      record.status === 'late' ? 'bg-warning-100 text-warning-800' : 
                      'bg-error-100 text-error-800'
                    }`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
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

export default EmployeeDashboard;