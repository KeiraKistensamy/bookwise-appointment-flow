
import { Service, TimeSlot } from '../types/booking';
import { format, addDays, setHours, setMinutes, addMinutes } from 'date-fns';

// Mock services data
export const services: Service[] = [
  {
    id: '1',
    name: 'Haircut',
    description: 'Professional haircut with styling',
    duration: 30,
    price: 35,
    category: 'Hair',
  },
  {
    id: '2',
    name: 'Hair Coloring',
    description: 'Full color treatment with professional products',
    duration: 90,
    price: 120,
    category: 'Hair',
  },
  {
    id: '3',
    name: 'Manicure',
    description: 'Classic manicure with polish',
    duration: 45,
    price: 40,
    category: 'Nail',
  },
  {
    id: '4',
    name: 'Pedicure',
    description: 'Relaxing pedicure with foot massage',
    duration: 60,
    price: 55,
    category: 'Nail',
  },
  {
    id: '5',
    name: 'Facial',
    description: 'Rejuvenating facial treatment',
    duration: 60,
    price: 80,
    category: 'Skin',
  },
  {
    id: '6',
    name: 'Massage',
    description: 'Full body relaxation massage',
    duration: 60,
    price: 90,
    category: 'Body',
  },
];

// Mock function to generate time slots for a given date
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  // Business hours: 9:00 AM to 5:00 PM
  const startHour = 9;
  const endHour = 17;
  
  const slots: TimeSlot[] = [];
  const isToday = date.getTime() === today.getTime();
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();

  // Generate slots in 30-minute increments
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      // Skip slots that have already passed today
      if (isToday && (hour < currentHour || (hour === currentHour && minutes <= currentMinutes))) {
        continue;
      }

      const startTimeDate = new Date(date);
      startTimeDate.setHours(hour, minutes, 0, 0);
      
      const endTimeDate = new Date(startTimeDate);
      endTimeDate.setMinutes(endTimeDate.getMinutes() + 30);

      const startTime = format(startTimeDate, 'HH:mm');
      const endTime = format(endTimeDate, 'HH:mm');
      
      // Randomly mark some slots as unavailable to simulate realistic booking
      const available = Math.random() > 0.3; // 70% chance of being available
      
      slots.push({
        startTime,
        endTime,
        available,
      });
    }
  }
  
  return slots;
};

// Generate bookable dates (next 14 days)
export const getBookableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    dates.push(date);
  }
  
  return dates;
};

// Mock function to get service categories
export const getServiceCategories = (): string[] => {
  const categories = services.map(service => service.category);
  return [...new Set(categories)];
};

// Mock function to get services by category
export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};
