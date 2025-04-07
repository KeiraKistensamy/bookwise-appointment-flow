
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

export type BookingDetails = {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
};

export type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation';
