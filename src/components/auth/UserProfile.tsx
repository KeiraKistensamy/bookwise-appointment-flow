
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';

const UserProfile: React.FC = () => {
  const { authState, logout } = useAuth();
  const { viewHistory } = useBooking();
  const user = authState.user;

  if (!user) return null;

  const handleViewHistory = () => {
    viewHistory();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Manage your account and appointments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Name</p>
          <p>{user.name}</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Email</p>
          <p>{user.email}</p>
        </div>
        
        {user.phone && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Phone</p>
            <p>{user.phone}</p>
          </div>
        )}
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewHistory}
          >
            View Appointment History
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={logout}
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
