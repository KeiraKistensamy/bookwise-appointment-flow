
export type Service = {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
};

export type TimeSlot = {
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  available: boolean;
};

export type BookingStatus = 'scheduled' | 'completed' | 'cancelled';

export type BookingDetails = {
  id?: string; // unique booking ID
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dateOfBirth?: string;
  isNewPatient?: boolean;
  notes: string;
  status?: BookingStatus;
  createdAt?: Date;
  emailSent?: boolean;
  userId?: string; // New field to associate booking with user
};

export type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation' | 'history';

// User types
export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  isNewPatient?: boolean;
  bookings: BookingDetails[];
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};
