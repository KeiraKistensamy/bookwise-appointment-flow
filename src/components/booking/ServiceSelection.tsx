
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { getServiceCategories, getServicesByCategory } from '@/data/mockData';
import { useBooking } from '@/contexts/BookingContext';
import { Service } from '@/types/booking';

const ServiceSelection: React.FC = () => {
  const { updateBookingDetails, setCurrentStep, bookingDetails } = useBooking();
  const [selectedService, setSelectedService] = useState<Service | null>(bookingDetails.service);
  
  const categories = getServiceCategories();
  const defaultCategory = categories[0];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (selectedService) {
      updateBookingDetails({ service: selectedService });
      setCurrentStep('datetime');
    }
  };

  return (
    <div className="booking-step max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Select a Service</h2>
      
      <Tabs defaultValue={defaultCategory} className="w-full">
        <TabsList className="mb-6 flex justify-center">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="px-4 py-2">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getServicesByCategory(category).map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all hover:border-booking hover:shadow-md ${
                    selectedService?.id === service.id ? 'border-booking bg-booking/5' : ''
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="flex justify-between">
                      <span>{service.duration} min</span>
                      <span className="font-medium">${service.price}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleContinue}
          disabled={!selectedService}
          className="bg-booking hover:bg-booking-dark"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;
