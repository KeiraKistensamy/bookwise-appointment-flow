
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';

const formSchema = z.object({
  customerName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  customerEmail: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  customerPhone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CustomerDetailsForm: React.FC = () => {
  const { bookingDetails, updateBookingDetails, setCurrentStep, completeBooking } = useBooking();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: bookingDetails.customerName,
      customerEmail: bookingDetails.customerEmail,
      customerPhone: bookingDetails.customerPhone,
      notes: bookingDetails.notes,
    },
  });

  const handleSubmit = (values: FormValues) => {
    updateBookingDetails(values);
    completeBooking();
  };

  const handleBack = () => {
    // Save current form values even if not submitted
    const values = form.getValues();
    updateBookingDetails(values);
    setCurrentStep('datetime');
  };

  return (
    <div className="booking-step max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Your Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any special requirements or requests"
                    className="resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={handleBack} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className="bg-booking hover:bg-booking-dark">
              Complete Booking
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerDetailsForm;
