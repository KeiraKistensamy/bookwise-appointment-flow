
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { Calendar, Clock, FileText } from 'lucide-react';
import { BookingDetails, BookingStatus } from '@/types/booking';

// Mock patient appointments history data
// In a real app, this would come from an API based on the patient's email/ID
const mockAppointmentHistory: BookingDetails[] = [
  {
    id: "apt-001",
    service: {
      id: "1",
      name: "Initial Consultation",
      description: "First-time patient assessment and care planning",
      duration: 45,
      price: 85,
      category: "Consultations"
    },
    date: new Date('2025-03-15T10:00:00'),
    timeSlot: {
      startTime: "10:00",
      endTime: "10:45",
      available: false
    },
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "555-123-4567",
    dateOfBirth: "1980-05-15",
    isNewPatient: true,
    notes: "First consultation for high blood pressure concerns",
    status: "completed",
    createdAt: new Date('2025-03-10T14:30:00')
  },
  {
    id: "apt-002",
    service: {
      id: "3",
      name: "Blood Pressure Check",
      description: "Routine blood pressure monitoring",
      duration: 15,
      price: 35,
      category: "Routine Care"
    },
    date: new Date('2025-03-30T14:15:00'),
    timeSlot: {
      startTime: "14:15",
      endTime: "14:30",
      available: false
    },
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "555-123-4567",
    dateOfBirth: "1980-05-15",
    isNewPatient: false,
    notes: "Follow-up appointment",
    status: "completed",
    createdAt: new Date('2025-03-25T09:15:00')
  },
  {
    id: "apt-003",
    service: {
      id: "5",
      name: "Medication Review",
      description: "Review and adjustment of current medications",
      duration: 30,
      price: 60,
      category: "Consultations"
    },
    date: new Date('2025-04-20T11:30:00'),
    timeSlot: {
      startTime: "11:30",
      endTime: "12:00",
      available: false
    },
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerPhone: "555-123-4567",
    dateOfBirth: "1980-05-15",
    isNewPatient: false,
    notes: "Medication review and potential adjustments",
    status: "scheduled",
    createdAt: new Date('2025-04-05T16:45:00')
  }
];

const getStatusBadgeColor = (status: BookingStatus) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const AppointmentHistory: React.FC = () => {
  const { resetBooking, setCurrentStep } = useBooking();
  const [appointments] = useState<BookingDetails[]>(mockAppointmentHistory);

  const handleNewBooking = () => {
    resetBooking();
    setCurrentStep('service');
  };

  return (
    <div className="booking-step max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Appointment History</h2>
        <Button 
          className="bg-booking hover:bg-booking-dark"
          onClick={handleNewBooking}
        >
          Book New Appointment
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Past and Upcoming Appointments</CardTitle>
          <CardDescription>
            View your complete appointment history with Nurse Connect
          </CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You don't have any appointments yet</p>
              <Button onClick={handleNewBooking}>Book Your First Appointment</Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-booking" />
                          {appointment.date ? format(appointment.date, 'MMM d, yyyy') : 'N/A'}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {appointment.timeSlot ? `${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}` : 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{appointment.service?.name || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">{appointment.service?.duration} min</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(appointment.status as BookingStatus)}>
                        {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-1 max-w-xs">
                        <FileText className="h-3.5 w-3.5 text-booking mt-0.5" />
                        <span className="text-sm">{appointment.notes || 'No notes'}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Need to cancel or reschedule an upcoming appointment?
        </p>
        <p className="text-sm text-muted-foreground">
          Please call our office at (555) 123-4567 at least 24 hours in advance.
        </p>
      </div>
    </div>
  );
};

export default AppointmentHistory;
