
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { generateTimeSlots, getBookableDates } from '@/data/mockData';
import { TimeSlot } from '@/types/booking';
import { ChevronLeft } from 'lucide-react';

const DateTimeSelection: React.FC = () => {
  const { bookingDetails, updateBookingDetails, setCurrentStep } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingDetails.date || undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(bookingDetails.timeSlot);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  const bookableDates = getBookableDates();

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(new Date(selectedDate));
      setAvailableTimeSlots(slots);
      
      // Clear selected time slot if changing date and the previously selected slot doesn't exist
      if (selectedTimeSlot) {
        const stillExists = slots.some(
          slot => slot.startTime === selectedTimeSlot.startTime && slot.available
        );
        if (!stillExists) {
          setSelectedTimeSlot(null);
        }
      }
    }
  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleBack = () => {
    setCurrentStep('service');
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      updateBookingDetails({
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });
      setCurrentStep('details');
    }
  };

  return (
    <div className="booking-step max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Select Date & Time</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-4">Select a Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={[
              { before: new Date() },
              { after: bookableDates[bookableDates.length - 1] }
            ]}
            className="rounded-md border p-3 pointer-events-auto"
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Select a Time</h3>
          {selectedDate ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Available times for {format(selectedDate, 'EEEE, MMMM do')}
              </p>
              
              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot ${!slot.available ? 'disabled' : ''} ${
                        selectedTimeSlot?.startTime === slot.startTime ? 'selected' : ''
                      }`}
                      onClick={() => slot.available && handleTimeSlotSelect(slot)}
                    >
                      {slot.startTime}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No available time slots</p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Please select a date first</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot}
          className="bg-booking hover:bg-booking-dark"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DateTimeSelection;
