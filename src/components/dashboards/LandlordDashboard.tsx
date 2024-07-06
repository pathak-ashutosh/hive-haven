// components/dashboards/LandlordDashboard.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { User } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const bookingData = [
  { month: 'Jan', bookings: 4 },
  { month: 'Feb', bookings: 3 },
  { month: 'Mar', bookings: 2 },
  { month: 'Apr', bookings: 5 },
  { month: 'May', bookings: 7 },
  { month: 'Jun', bookings: 6 },
];

interface LandlordDashboardProps {
  user: User;
}

const LandlordDashboard: React.FC<LandlordDashboardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        title="My Properties" 
        subtitle="Manage your listed properties"
        footer={
          <Button onClick={() => router.push('/add-property')}>Add New Property</Button>
        }
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>123 Student St</span>
            <Button variant="outline" size="sm">Edit</Button>
          </li>
          <li className="flex justify-between items-center">
            <span>456 College Ave</span>
            <Button variant="outline" size="sm">Edit</Button>
          </li>
        </ul>
      </Card>

      <Card 
        title="Booking Requests" 
        subtitle="Review and manage new booking requests"
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>John Doe - 123 Student St</span>
            <div>
              <Button variant="outline" size="sm" className="mr-2">Decline</Button>
              <Button size="sm">Accept</Button>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span>Jane Smith - 456 College Ave</span>
            <div>
              <Button variant="outline" size="sm" className="mr-2">Decline</Button>
              <Button size="sm">Accept</Button>
            </div>
          </li>
        </ul>
      </Card>

      <Card 
        title="Booking Statistics" 
        subtitle="Overview of your property bookings"
        className="col-span-full"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default LandlordDashboard;