
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { cn } from '@/lib/utils';

const steps = [
  { key: 'service', label: 'Service' },
  { key: 'datetime', label: 'Date & Time' },
  { key: 'details', label: 'Your Details' },
  { key: 'confirmation', label: 'Confirmation' },
];

const BookingSteps: React.FC = () => {
  const { currentStep } = useBooking();
  
  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isConfirmation = step.key === 'confirmation';
          
          return (
            <div key={step.key} className="flex flex-col items-center w-full">
              <div className="relative flex items-center justify-center">
                {isCompleted ? (
                  <div className="h-8 w-8 rounded-full bg-booking flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <div 
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium",
                      isActive
                        ? "bg-booking text-white" 
                        : "bg-secondary text-muted-foreground border border-muted"
                    )}
                  >
                    {index + 1}
                  </div>
                )}
                
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute top-4 w-full h-[2px] left-1/2",
                      index < currentIndex ? "bg-booking" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <span 
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isActive ? "text-booking" : isCompleted ? "text-booking" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingSteps;
