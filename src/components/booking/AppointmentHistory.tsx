
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const AppointmentHistory: React.FC = () => {
  const { resetBooking } = useBooking();
  const { authState } = useAuth();
  
  const bookings = authState.user?.bookings || [];
  const hasBookings = bookings.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your Appointment History</h2>
        <p className="text-muted-foreground mt-2">
          {hasBookings 
            ? "Here's a record of your recent appointments" 
            : "You don't have any appointment history yet"}
        </p>
      </div>

      {!authState.isAuthenticated && (
        <Card className="border-dashed border-2 border-booking/30">
          <CardHeader className="text-center">
            <CardTitle>Log In to View Your Appointments</CardTitle>
            <CardDescription>
              Create or log into your account to track your appointment history
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              className="bg-booking hover:bg-booking-dark"
              onClick={() => window.location.href = '/account'}
            >
              Go to Account
            </Button>
          </CardContent>
        </Card>
      )}

      {authState.isAuthenticated && !hasBookings && (
        <Card className="border-dashed border-2 border-booking/30">
          <CardHeader className="text-center">
            <CardTitle>No Appointments Yet</CardTitle>
            <CardDescription>
              You haven't booked any appointments with us yet
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              className="bg-booking hover:bg-booking-dark"
              onClick={resetBooking}
            >
              Book Your First Appointment
            </Button>
          </CardContent>
        </Card>
      )}

      {hasBookings && (
        <div className="space-y-4">
          {bookings.map((booking, index) => {
            const dateString = booking.date instanceof Date 
              ? format(booking.date, 'MMMM d, yyyy')
              : booking.date 
                ? format(new Date(booking.date), 'MMMM d, yyyy')
                : 'Date not available';
                
            return (
              <Card key={booking.id || index} className="overflow-hidden">
                <div className={`h-2 ${getStatusColor(booking.status)}`} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{booking.service?.name || 'Service not specified'}</CardTitle>
                      <CardDescription>{dateString}</CardDescription>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(booking.status)}`}>
                      {booking.status || 'scheduled'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm font-medium">
                        {booking.timeSlot?.startTime || 'Time not specified'}
                      </span>
                    </div>
                    {booking.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Booked on:</span>
                        <span className="text-sm">
                          {format(new Date(booking.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          <div className="flex justify-center pt-4">
            <Button
              onClick={resetBooking}
              className="bg-booking hover:bg-booking-dark"
            >
              Book New Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for styling based on booking status
function getStatusColor(status?: string): string {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'cancelled': return 'bg-red-500';
    default: return 'bg-booking';
  }
}

function getStatusBadgeClasses(status?: string): string {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-blue-100 text-blue-800';
  }
}

export default AppointmentHistory;
