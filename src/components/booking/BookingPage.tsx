
import React from 'react';
import { Link } from 'react-router-dom';
import { BookingProvider, useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import BookingSteps from './BookingSteps';
import ServiceSelection from './ServiceSelection';
import DateTimeSelection from './DateTimeSelection';
import CustomerDetailsForm from './CustomerDetailsForm';
import BookingConfirmation from './BookingConfirmation';
import AppointmentHistory from './AppointmentHistory';
import { Button } from '../ui/button';
import { UserCircle } from 'lucide-react';

const BookingContent: React.FC = () => {
  const { currentStep } = useBooking();

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingSteps />
      
      {currentStep === 'service' && <ServiceSelection />}
      {currentStep === 'datetime' && <DateTimeSelection />}
      {currentStep === 'details' && <CustomerDetailsForm />}
      {currentStep === 'confirmation' && <BookingConfirmation />}
      {currentStep === 'history' && <AppointmentHistory />}
    </div>
  );
};

const BookingPageHeader: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <header className="bg-white border-b py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-booking">Nurse Connect</h1>
            <p className="text-muted-foreground">Book your nursing appointment online</p>
          </div>
          <div>
            <Link to="/account">
              <Button variant={authState.isAuthenticated ? "default" : "outline"} className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                {authState.isAuthenticated ? authState.user?.name : "Account"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const BookingPage: React.FC = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen">
        <BookingPageHeader />
        
        <main>
          <BookingContent />
        </main>
        
        <footer className="py-6 mt-12 border-t">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nurse Connect. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </BookingProvider>
  );
};

export default BookingPage;
