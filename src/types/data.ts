import { UserRole } from './auth';

export interface Center {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  postalCode: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assignerName: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  centerId: string;
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  imageUrl?: string | null;
  status: 'present' | 'absent' | 'late';
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  fee: number;
  startDate: string;
  endDate: string;
  centerId: string;
  status: 'active' | 'upcoming' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  instructorId: string;
  instructorName: string;
  centerId: string;
  scheduleDetails: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  enrollmentDate: string;
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  centerId: string;
  status: 'active' | 'completed' | 'dropped';
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  centerId: string;
  centerName: string;
  date: string;
  marketingExecutiveId: string | null;
  marketingExecutiveName: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FeePayment {
  id: string;
  admissionId: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'card' | 'online' | 'bank_transfer';
  status: 'success' | 'pending' | 'failed';
  reference: string;
  receivedBy: string;
  createdAt: string;
}

export interface Incentive {
  id: string;
  marketingExecutiveId: string;
  marketingExecutiveName: string;
  admissionId: string;
  studentName: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  approvedBy?: string;
  approvedDate?: string;
  paidDate?: string;
  createdAt: string;
}

export interface Target {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  centerId: string | null;
  month: string;
  year: number;
  targetType: 'admissions' | 'revenue' | 'other';
  targetValue: number;
  achievedValue: number;
  progress: number;
  status: 'in_progress' | 'achieved' | 'missed';
  createdAt: string;
  updatedAt: string;
}