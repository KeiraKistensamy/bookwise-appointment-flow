
import React from 'react';
import AuthPage from '@/components/auth/AuthPage';

const AccountPage = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-booking text-center">Nurse Connect</h1>
          <p className="text-center text-muted-foreground">Manage your account</p>
        </div>
      </header>
      
      <main>
        <AuthPage />
      </main>
      
      <footer className="py-6 mt-12 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nurse Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AccountPage;
