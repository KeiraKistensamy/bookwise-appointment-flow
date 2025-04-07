
import React, { createContext, useContext, useState } from 'react';
import { BookingDetails, BookingStep, Service, TimeSlot } from '../types/booking';

interface BookingContextType {
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  bookingDetails: BookingDetails;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
  completeBooking: () => void;
  viewHistory: () => void;
}

const defaultBookingDetails: BookingDetails = {
  service: null,
  date: null,
  timeSlot: null,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  notes: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails);

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({
      ...prev,
      ...details,
    }));
  };

  const resetBooking = () => {
    setBookingDetails(defaultBookingDetails);
    setCurrentStep('service');
  };

  const completeBooking = () => {
    console.log('Booking completed:', bookingDetails);
    // In a real app, this would send the booking data to a server
    // For now, we'll just show the confirmation step
    setCurrentStep('confirmation');
  };
  
  const viewHistory = () => {
    setCurrentStep('history');
  };

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        bookingDetails,
        updateBookingDetails,
        resetBooking,
        completeBooking,
        viewHistory,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
