import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from './components/Layout/AppLayout';
import LoginForm from './components/Auth/LoginForm';
import DashboardRouter from './components/Dashboard/DashboardRouter';
import AdmissionForm from './components/Marketing/AdmissionForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route 
            path="/dashboard" 
            element={
              <AppLayout>
                <DashboardRouter />
              </AppLayout>
            } 
          />
          
          <Route
            path="/admissions/new"
            element={
              <AppLayout>
                <AdmissionForm />
              </AppLayout>
            }
          />
          
          {/* Add more routes for other features */}
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;