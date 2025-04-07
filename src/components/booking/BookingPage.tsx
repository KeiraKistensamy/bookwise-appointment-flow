
import React from 'react';
import { BookingProvider, useBooking } from '@/contexts/BookingContext';
import BookingSteps from './BookingSteps';
import ServiceSelection from './ServiceSelection';
import DateTimeSelection from './DateTimeSelection';
import CustomerDetailsForm from './CustomerDetailsForm';
import BookingConfirmation from './BookingConfirmation';

const BookingContent: React.FC = () => {
  const { currentStep } = useBooking();

  return (
    <div className="container mx-auto px-4 py-8">
      <BookingSteps />
      
      {currentStep === 'service' && <ServiceSelection />}
      {currentStep === 'datetime' && <DateTimeSelection />}
      {currentStep === 'details' && <CustomerDetailsForm />}
      {currentStep === 'confirmation' && <BookingConfirmation />}
    </div>
  );
};

const BookingPage: React.FC = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen">
        <header className="bg-white border-b py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-booking text-center">Nurse Connect</h1>
            <p className="text-center text-muted-foreground">Book your nursing appointment online</p>
          </div>
        </header>
        
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
