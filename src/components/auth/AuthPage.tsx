
import React from 'react';
import AuthForm from './AuthForm';
import UserProfile from './UserProfile';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Account Management</h1>
      {authState.isAuthenticated ? <UserProfile /> : <AuthForm />}
    </div>
  );
};

export default AuthPage;
