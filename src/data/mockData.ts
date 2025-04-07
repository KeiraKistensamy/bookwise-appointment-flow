
import { Service, TimeSlot } from '../types/booking';
import { format, addDays, setHours, setMinutes, addMinutes } from 'date-fns';

// Mock services data for nursing appointments
export const services: Service[] = [
  {
    id: '1',
    name: 'Initial Consultation',
    description: 'First-time patient assessment and care planning',
    duration: 45,
    price: 85,
    category: 'Consultations',
  },
  {
    id: '2',
    name: 'Follow-up Visit',
    description: 'Check progress and adjust care plan as needed',
    duration: 30,
    price: 60,
    category: 'Consultations',
  },
  {
    id: '3',
    name: 'Blood Pressure Check',
    description: 'Quick blood pressure monitoring and assessment',
    duration: 15,
    price: 30,
    category: 'Health Checks',
  },
  {
    id: '4',
    name: 'Glucose Monitoring',
    description: 'Diabetes management and blood sugar testing',
    duration: 20,
    price: 40,
    category: 'Health Checks',
  },
  {
    id: '5',
    name: 'Medication Review',
    description: 'Comprehensive review of current medications',
    duration: 30,
    price: 55,
    category: 'Medication',
  },
  {
    id: '6',
    name: 'Wound Care',
    description: 'Professional cleaning and dressing of wounds',
    duration: 25,
    price: 50,
    category: 'Treatments',
  },
  {
    id: '7',
    name: 'Vaccination',
    description: 'Administration of vaccines with consultation',
    duration: 15,
    price: 45,
    category: 'Treatments',
  },
  {
    id: '8',
    name: 'Health Education',
    description: 'Personalized health education and guidance',
    duration: 40,
    price: 70,
    category: 'Education',
  }
];

// Mock function to generate time slots for a given date
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  // Nurse's office hours: 8:00 AM to 5:00 PM
  const startHour = 8;
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
