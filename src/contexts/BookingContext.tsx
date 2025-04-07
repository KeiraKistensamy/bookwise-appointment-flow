
import React, { createContext, useContext, useState } from 'react';
import { BookingDetails, BookingStep, Service, TimeSlot } from '../types/booking';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

interface BookingContextType {
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  bookingDetails: BookingDetails;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  resetBooking: () => void;
  completeBooking: () => void;
  viewHistory: () => void;
  sendConfirmationEmail: (booking: BookingDetails) => Promise<void>;
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
  const { authState, addBookingToUser } = useAuth();

  // Pre-fill customer details from the authenticated user
  React.useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      setBookingDetails(prev => ({
        ...prev,
        customerName: authState.user?.name || prev.customerName,
        customerEmail: authState.user?.email || prev.customerEmail,
        customerPhone: authState.user?.phone || prev.customerPhone,
        dateOfBirth: authState.user?.dateOfBirth || prev.dateOfBirth,
        isNewPatient: authState.user?.isNewPatient || prev.isNewPatient,
        userId: authState.user?.id,
      }));
    }
  }, [authState]);

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({
      ...prev,
      ...details,
    }));
  };

  const resetBooking = () => {
    // When resetting, retain user information if logged in
    if (authState.isAuthenticated && authState.user) {
      setBookingDetails({
        ...defaultBookingDetails,
        customerName: authState.user.name,
        customerEmail: authState.user.email,
        customerPhone: authState.user.phone || '',
        dateOfBirth: authState.user.dateOfBirth,
        isNewPatient: authState.user.isNewPatient,
        userId: authState.user.id,
      });
    } else {
      setBookingDetails(defaultBookingDetails);
    }
    setCurrentStep('service');
  };

  const sendConfirmationEmail = async (booking: BookingDetails) => {
    // In a real application, this would call a backend API endpoint
    // that would use a service like SendGrid, Mailgun, or AWS SES
    
    // For demonstration purposes, we'll just show a toast notification
    console.log('Sending confirmation email to:', booking.customerEmail);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success notification
    toast({
      title: "Email Sent",
      description: `Confirmation email sent to ${booking.customerEmail}`,
    });
    
    return Promise.resolve();
  };

  const completeBooking = async () => {
    // Generate a unique ID for the booking
    const bookingWithId = {
      ...bookingDetails,
      id: `booking-${Math.random().toString(36).substr(2, 9)}`,
      status: 'scheduled' as const,
      createdAt: new Date(),
    };
    
    console.log('Booking completed:', bookingWithId);
    
    // If user is authenticated, associate booking with user
    if (authState.isAuthenticated && authState.user) {
      addBookingToUser(authState.user.id, bookingWithId);
    }
    
    // Send confirmation email if email is provided
    if (bookingWithId.customerEmail) {
      await sendConfirmationEmail(bookingWithId);
    } else {
      toast({
        title: "Booking Confirmed",
        description: "Your appointment has been successfully booked.",
      });
    }
    
    // In a real app, this would send the booking data to a server
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
        sendConfirmationEmail,
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
