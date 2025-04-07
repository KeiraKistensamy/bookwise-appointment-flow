
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBooking } from '@/contexts/BookingContext';
import { Check, Calendar, Clock, MapPin, User } from 'lucide-react';

const BookingConfirmation: React.FC = () => {
  const { bookingDetails, resetBooking } = useBooking();
  const { service, date, timeSlot, customerName, customerEmail, customerPhone } = bookingDetails;

  const bookingConfirmationId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="booking-step max-w-2xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Booking Confirmed!</h2>
      <p className="text-center text-muted-foreground mb-8">
        Your appointment has been successfully booked. Confirmation details have been sent to your email.
      </p>
      
      <Card className="border-booking/20 shadow-md">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Confirmation #{bookingConfirmationId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {service && (
            <div>
              <h3 className="text-sm font-medium mb-1">Service</h3>
              <p className="text-lg">{service.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {service.duration} minutes
              </p>
            </div>
          )}
          
          <Separator />
          
          {date && timeSlot && (
            <div>
              <h3 className="text-sm font-medium mb-1">Date & Time</h3>
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-booking" />
                <span>{format(date, 'EEEE, MMMM do, yyyy')}</span>
              </p>
              <p className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-booking" />
                <span>{timeSlot.startTime} - {timeSlot.endTime}</span>
              </p>
            </div>
          )}
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-1">Location</h3>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-booking mt-1" />
              <span>
                123 Beauty Street<br />
                Salon City, SC 12345
              </span>
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-1">Customer Details</h3>
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 text-booking" />
              <span>{customerName}</span>
            </p>
            <p className="text-sm text-muted-foreground ml-6">{customerEmail}</p>
            <p className="text-sm text-muted-foreground ml-6">{customerPhone}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={resetBooking} 
            className="w-full bg-booking hover:bg-booking-dark"
          >
            Book Another Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
