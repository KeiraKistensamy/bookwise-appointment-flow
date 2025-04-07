
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// In a real app, this would come from an API
const mockBookings = [
  {
    id: 'bk-001',
    serviceName: 'Initial Consultation',
    date: new Date('2025-04-10T10:30:00'),
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    isNewPatient: true,
    status: 'upcoming',
  },
  {
    id: 'bk-002',
    serviceName: 'Blood Pressure Check',
    date: new Date('2025-04-11T14:00:00'),
    customerName: 'Emily Johnson',
    customerEmail: 'emily@example.com',
    isNewPatient: false,
    status: 'upcoming',
  },
  {
    id: 'bk-003',
    serviceName: 'Medication Review',
    date: new Date('2025-04-09T11:00:00'),
    customerName: 'Michael Brown',
    customerEmail: 'michael@example.com',
    isNewPatient: false,
    status: 'completed',
  },
  {
    id: 'bk-004',
    serviceName: 'Wound Care',
    date: new Date('2025-04-08T15:30:00'),
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    isNewPatient: true,
    status: 'cancelled',
  },
];

const AdminPage: React.FC = () => {
  const [bookings, setBookings] = useState(mockBookings);

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const upcomingBookings = bookings.filter(booking => booking.status === 'upcoming');
  const completedBookings = bookings.filter(booking => booking.status === 'completed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-booking">Nurse Connect Admin</h1>
            <p className="text-muted-foreground">Manage your patient appointments</p>
          </div>
          <Link to="/">
            <Button variant="outline">View Booking Page</Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Patient Appointments</CardTitle>
            <CardDescription>View and manage all scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">
                  Upcoming ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <BookingsList 
                  bookings={upcomingBookings} 
                  onStatusChange={handleStatusChange} 
                />
              </TabsContent>
              
              <TabsContent value="completed">
                <BookingsList 
                  bookings={completedBookings} 
                  onStatusChange={handleStatusChange} 
                />
              </TabsContent>
              
              <TabsContent value="cancelled">
                <BookingsList 
                  bookings={cancelledBookings} 
                  onStatusChange={handleStatusChange} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

interface BookingsListProps {
  bookings: typeof mockBookings;
  onStatusChange: (id: string, status: string) => void;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings, onStatusChange }) => {
  if (bookings.length === 0) {
    return <p className="text-center py-8 text-muted-foreground">No appointments found</p>;
  }
  
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4">
              <h3 className="font-semibold mb-2">
                {booking.serviceName}
                {booking.isNewPatient && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                    New Patient
                  </span>
                )}
              </h3>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-booking" />
                  <span>{format(booking.date, 'EEEE, MMMM do, yyyy')}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-booking" />
                  <span>{format(booking.date, 'h:mm a')}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-booking" />
                  <span>
                    {booking.customerName} ({booking.customerEmail})
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 p-4 bg-gray-50">
              {booking.status === 'upcoming' && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onStatusChange(booking.id, 'completed')}
                  >
                    Mark Completed
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => onStatusChange(booking.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              )}
              
              {booking.status === 'completed' && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onStatusChange(booking.id, 'upcoming')}
                >
                  Revert to Upcoming
                </Button>
              )}
              
              {booking.status === 'cancelled' && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onStatusChange(booking.id, 'upcoming')}
                >
                  Restore Appointment
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminPage;
