/*
  # Initial Schema Setup for Training Center Management

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `role` (text)
      - `center_id` (uuid, nullable)
      - `avatar_url` (text, nullable)
      - `phone_number` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `centers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `phone_number` (text)
      - `email` (text)
      - `city` (text)
      - `state` (text)
      - `postal_code` (text)
      - `capacity` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `courses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `duration` (text)
      - `fee` (numeric)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `center_id` (uuid)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `batches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `course_id` (uuid)
      - `start_date` (timestamptz)
      - `end_date` (timestamptz)
      - `capacity` (integer)
      - `enrolled` (integer)
      - `instructor_id` (uuid)
      - `center_id` (uuid)
      - `schedule_details` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `address` (text)
      - `date_of_birth` (date)
      - `enrollment_date` (date)
      - `course_id` (uuid)
      - `batch_id` (uuid)
      - `center_id` (uuid)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `attendance_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `center_id` (uuid)
      - `date` (date)
      - `check_in_time` (timestamptz)
      - `check_out_time` (timestamptz, nullable)
      - `location_latitude` (numeric)
      - `location_longitude` (numeric)
      - `location_address` (text, nullable)
      - `image_url` (text, nullable)
      - `status` (text)
      - `created_at` (timestamptz)

    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `assignee_id` (uuid)
      - `assigner_id` (uuid)
      - `due_date` (timestamptz)
      - `status` (text)
      - `priority` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `admissions`
      - `id` (uuid, primary key)
      - `student_id` (uuid)
      - `course_id` (uuid)
      - `batch_id` (uuid)
      - `center_id` (uuid)
      - `marketing_executive_id` (uuid, nullable)
      - `date` (date)
      - `status` (text)
      - `total_fee` (numeric)
      - `paid_amount` (numeric)
      - `pending_amount` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `fee_payments`
      - `id` (uuid, primary key)
      - `admission_id` (uuid)
      - `student_id` (uuid)
      - `amount` (numeric)
      - `payment_date` (date)
      - `payment_method` (text)
      - `status` (text)
      - `reference` (text)
      - `received_by` (uuid)
      - `created_at` (timestamptz)

    - `incentives`
      - `id` (uuid, primary key)
      - `marketing_executive_id` (uuid)
      - `admission_id` (uuid)
      - `amount` (numeric)
      - `status` (text)
      - `approved_by` (uuid, nullable)
      - `approved_date` (timestamptz, nullable)
      - `paid_date` (timestamptz, nullable)
      - `created_at` (timestamptz)

    - `targets`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `center_id` (uuid, nullable)
      - `month` (text)
      - `year` (integer)
      - `target_type` (text)
      - `target_value` (numeric)
      - `achieved_value` (numeric)
      - `progress` (numeric)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their roles
    - Ensure data privacy and access control

  3. Foreign Key Relationships
    - Link users to centers
    - Link courses to centers
    - Link batches to courses and centers
    - Link students to courses, batches, and centers
    - Link attendance records to users and centers
    - Link tasks to users
    - Link admissions to students, courses, batches, and centers
    - Link fee payments to admissions and students
    - Link incentives to marketing executives and admissions
    - Link targets to users and centers
*/

-- Create enum types for various status fields
CREATE TYPE user_role AS ENUM ('admin', 'marketing', 'employee', 'center_head');
CREATE TYPE course_status AS ENUM ('active', 'upcoming', 'completed');
CREATE TYPE batch_status AS ENUM ('active', 'upcoming', 'completed');
CREATE TYPE student_status AS ENUM ('active', 'completed', 'dropped');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE admission_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'online', 'bank_transfer');
CREATE TYPE payment_status AS ENUM ('success', 'pending', 'failed');
CREATE TYPE incentive_status AS ENUM ('pending', 'approved', 'paid');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late');
CREATE TYPE target_status AS ENUM ('in_progress', 'achieved', 'missed');
CREATE TYPE target_type AS ENUM ('admissions', 'revenue', 'other');

-- Create centers table
CREATE TABLE centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone_number text,
  email text,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text,
  capacity integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL,
  center_id uuid REFERENCES centers(id),
  avatar_url text,
  phone_number text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  duration text NOT NULL,
  fee numeric NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  center_id uuid NOT NULL REFERENCES centers(id),
  status course_status NOT NULL DEFAULT 'upcoming',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create batches table
CREATE TABLE batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  course_id uuid NOT NULL REFERENCES courses(id),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  capacity integer NOT NULL DEFAULT 30,
  enrolled integer NOT NULL DEFAULT 0,
  instructor_id uuid NOT NULL REFERENCES users(id),
  center_id uuid NOT NULL REFERENCES centers(id),
  schedule_details text NOT NULL,
  status batch_status NOT NULL DEFAULT 'upcoming',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone_number text,
  address text,
  date_of_birth date,
  enrollment_date date NOT NULL DEFAULT CURRENT_DATE,
  course_id uuid NOT NULL REFERENCES courses(id),
  batch_id uuid NOT NULL REFERENCES batches(id),
  center_id uuid NOT NULL REFERENCES centers(id),
  status student_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create attendance_records table
CREATE TABLE attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  center_id uuid NOT NULL REFERENCES centers(id),
  date date NOT NULL DEFAULT CURRENT_DATE,
  check_in_time timestamptz NOT NULL DEFAULT now(),
  check_out_time timestamptz,
  location_latitude numeric,
  location_longitude numeric,
  location_address text,
  image_url text,
  status attendance_status NOT NULL DEFAULT 'present',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  assignee_id uuid NOT NULL REFERENCES users(id),
  assigner_id uuid NOT NULL REFERENCES users(id),
  due_date timestamptz NOT NULL,
  status task_status NOT NULL DEFAULT 'pending',
  priority task_priority NOT NULL DEFAULT 'medium',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create admissions table
CREATE TABLE admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id),
  course_id uuid NOT NULL REFERENCES courses(id),
  batch_id uuid NOT NULL REFERENCES batches(id),
  center_id uuid NOT NULL REFERENCES centers(id),
  marketing_executive_id uuid REFERENCES users(id),
  date date NOT NULL DEFAULT CURRENT_DATE,
  status admission_status NOT NULL DEFAULT 'pending',
  total_fee numeric NOT NULL,
  paid_amount numeric NOT NULL DEFAULT 0,
  pending_amount numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create fee_payments table
CREATE TABLE fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_id uuid NOT NULL REFERENCES admissions(id),
  student_id uuid NOT NULL REFERENCES students(id),
  amount numeric NOT NULL,
  payment_date date NOT NULL DEFAULT CURRENT_DATE,
  payment_method payment_method NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  reference text,
  received_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create incentives table
CREATE TABLE incentives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marketing_executive_id uuid NOT NULL REFERENCES users(id),
  admission_id uuid NOT NULL REFERENCES admissions(id),
  amount numeric NOT NULL,
  status incentive_status NOT NULL DEFAULT 'pending',
  approved_by uuid REFERENCES users(id),
  approved_date timestamptz,
  paid_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create targets table
CREATE TABLE targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  center_id uuid REFERENCES centers(id),
  month text NOT NULL,
  year integer NOT NULL,
  target_type target_type NOT NULL,
  target_value numeric NOT NULL,
  achieved_value numeric NOT NULL DEFAULT 0,
  progress numeric NOT NULL DEFAULT 0,
  status target_status NOT NULL DEFAULT 'in_progress',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE incentives ENABLE ROW LEVEL SECURITY;
ALTER TABLE targets ENABLE ROW LEVEL SECURITY;

-- Create policies for centers
CREATE POLICY "Centers are viewable by authenticated users" ON centers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Centers are manageable by admins" ON centers
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for users
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can manage users" ON users
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for courses
CREATE POLICY "Courses are viewable by authenticated users" ON courses
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Courses are manageable by admins and center heads" ON courses
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head') AND
    (auth.jwt() ->> 'role' = 'admin' OR center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

-- Create policies for batches
CREATE POLICY "Batches are viewable by authenticated users" ON batches
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Batches are manageable by admins and center heads" ON batches
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head') AND
    (auth.jwt() ->> 'role' = 'admin' OR center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

-- Create policies for students
CREATE POLICY "Students are viewable by authenticated users" ON students
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Students are manageable by admins, center heads, and marketing" ON students
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head', 'marketing') AND
    (auth.jwt() ->> 'role' = 'admin' OR center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

-- Create policies for attendance_records
CREATE POLICY "Users can view their own attendance" ON attendance_records
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'role' IN ('admin', 'center_head') OR
    (auth.jwt() ->> 'role' = 'center_head' AND center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

CREATE POLICY "Users can manage their own attendance" ON attendance_records
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins and center heads can manage all attendance" ON attendance_records
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head') AND
    (auth.jwt() ->> 'role' = 'admin' OR center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

-- Create policies for tasks
CREATE POLICY "Users can view assigned tasks" ON tasks
  FOR SELECT TO authenticated
  USING (
    assignee_id = auth.uid() OR
    assigner_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Users can update their assigned tasks" ON tasks
  FOR UPDATE TO authenticated
  USING (assignee_id = auth.uid())
  WITH CHECK (assignee_id = auth.uid());

CREATE POLICY "Admins and center heads can manage tasks" ON tasks
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin', 'center_head'));

-- Create policies for admissions
CREATE POLICY "Admissions are viewable by authenticated users" ON admissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admissions are manageable by admins, center heads, and marketing" ON admissions
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head', 'marketing') AND
    (auth.jwt() ->> 'role' = 'admin' OR center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

-- Create policies for fee_payments
CREATE POLICY "Fee payments are viewable by authenticated users" ON fee_payments
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Fee payments are manageable by admins and center heads" ON fee_payments
  FOR ALL TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'center_head') AND
    (auth.jwt() ->> 'role' = 'admin' OR received_by = auth.uid())
  );

-- Create policies for incentives
CREATE POLICY "Marketing executives can view their incentives" ON incentives
  FOR SELECT TO authenticated
  USING (
    marketing_executive_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Only admins can manage incentives" ON incentives
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for targets
CREATE POLICY "Users can view their targets" ON targets
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() ->> 'role' = 'center_head' AND center_id = (
      SELECT center_id FROM users WHERE id = auth.uid()
    ))
  );

CREATE POLICY "Only admins can manage targets" ON targets
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_center_id ON users(center_id);
CREATE INDEX idx_courses_center_id ON courses(center_id);
CREATE INDEX idx_batches_course_id ON batches(course_id);
CREATE INDEX idx_batches_center_id ON batches(center_id);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_course_id ON students(course_id);
CREATE INDEX idx_students_batch_id ON students(batch_id);
CREATE INDEX idx_students_center_id ON students(center_id);
CREATE INDEX idx_attendance_user_id ON attendance_records(user_id);
CREATE INDEX idx_attendance_center_id ON attendance_records(center_id);
CREATE INDEX idx_attendance_date ON attendance_records(date);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_assigner_id ON tasks(assigner_id);
CREATE INDEX idx_admissions_student_id ON admissions(student_id);
CREATE INDEX idx_admissions_course_id ON admissions(course_id);
CREATE INDEX idx_admissions_batch_id ON admissions(batch_id);
CREATE INDEX idx_admissions_center_id ON admissions(center_id);
CREATE INDEX idx_fee_payments_admission_id ON fee_payments(admission_id);
CREATE INDEX idx_fee_payments_student_id ON fee_payments(student_id);
CREATE INDEX idx_incentives_marketing_executive_id ON incentives(marketing_executive_id);
CREATE INDEX idx_incentives_admission_id ON incentives(admission_id);
CREATE INDEX idx_targets_user_id ON targets(user_id);
CREATE INDEX idx_targets_center_id ON targets(center_id);