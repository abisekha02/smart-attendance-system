import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please click the "Connect to Supabase" button to set up your database connection.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper functions for real-time subscriptions
export const subscribeToTable = (
  table: string,
  callback: (payload: any) => void,
  filter?: string
) => {
  const channel = supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
        filter: filter
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Database operations
export const db = {
  // Users
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return data;
  },

  // Centers
  async getCenters() {
    const { data } = await supabase
      .from('centers')
      .select('*')
      .order('name');
    return data;
  },

  // Courses
  async getCourses(centerId?: string) {
    let query = supabase
      .from('courses')
      .select('*')
      .order('name');
    
    if (centerId) {
      query = query.eq('center_id', centerId);
    }
    
    const { data } = await query;
    return data;
  },

  // Batches
  async getBatches(courseId?: string) {
    let query = supabase
      .from('batches')
      .select(`
        *,
        courses (
          name,
          duration,
          fee
        )
      `)
      .order('start_date');
    
    if (courseId) {
      query = query.eq('course_id', courseId);
    }
    
    const { data } = await query;
    return data;
  },

  // Students
  async getStudents(centerId?: string) {
    let query = supabase
      .from('students')
      .select(`
        *,
        courses (name),
        batches (name)
      `)
      .order('name');
    
    if (centerId) {
      query = query.eq('center_id', centerId);
    }
    
    const { data } = await query;
    return data;
  },

  // Attendance
  async markAttendance(userId: string, location: { latitude: number; longitude: number }, imageUrl: string) {
    const { data: user } = await supabase
      .from('users')
      .select('center_id')
      .eq('id', userId)
      .single();

    if (!user?.center_id) throw new Error('User center not found');

    const { data, error } = await supabase
      .from('attendance_records')
      .insert({
        user_id: userId,
        center_id: user.center_id,
        location_latitude: location.latitude,
        location_longitude: location.longitude,
        image_url: imageUrl
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Tasks
  async getTasks(assigneeId?: string) {
    let query = supabase
      .from('tasks')
      .select(`
        *,
        assignee:assignee_id(name),
        assigner:assigner_id(name)
      `)
      .order('due_date');
    
    if (assigneeId) {
      query = query.eq('assignee_id', assigneeId);
    }
    
    const { data } = await query;
    return data;
  },

  // Admissions
  async createAdmission(admissionData: any) {
    const { data, error } = await supabase
      .from('admissions')
      .insert(admissionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Fee Payments
  async recordPayment(paymentData: any) {
    const { data, error } = await supabase
      .from('fee_payments')
      .insert(paymentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Incentives
  async calculateIncentive(admissionId: string) {
    const { data: admission } = await supabase
      .from('admissions')
      .select('total_fee, marketing_executive_id')
      .eq('id', admissionId)
      .single();

    if (!admission?.marketing_executive_id) return null;

    // Calculate 10% incentive
    const incentiveAmount = admission.total_fee * 0.1;

    const { data, error } = await supabase
      .from('incentives')
      .insert({
        marketing_executive_id: admission.marketing_executive_id,
        admission_id: admissionId,
        amount: incentiveAmount
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};