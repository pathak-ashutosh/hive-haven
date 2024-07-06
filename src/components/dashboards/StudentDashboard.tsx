// components/dashboards/StudentDashboard.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { User } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface StudentDashboardProps {
  user: User;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        title="My Bookings" 
        subtitle="View and manage your current bookings"
        footer={
          <Button onClick={() => router.push('/bookings')}>View All Bookings</Button>
        }
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>123 Student St - Room 2</span>
            <Button variant="outline" size="sm">Details</Button>
          </li>
          <li className="flex justify-between items-center">
            <span>456 College Ave - Apt 3B</span>
            <Button variant="outline" size="sm">Details</Button>
          </li>
        </ul>
      </Card>

      <Card 
        title="Saved Properties" 
        subtitle="Properties you've bookmarked"
        footer={
          <Button onClick={() => router.push('/properties')}>Browse More Properties</Button>
        }
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>789 University Blvd - Studio</span>
            <Button size="sm">View</Button>
          </li>
          <li className="flex justify-between items-center">
            <span>101 Dorm Lane - Single Room</span>
            <Button size="sm">View</Button>
          </li>
        </ul>
      </Card>

      <Card 
        title="Upcoming Payments" 
        subtitle="Your next due payments"
        className="col-span-full"
      >
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>123 Student St - Room 2</span>
            <div>
              <span className="mr-4">$500 due on July 1, 2023</span>
              <Button size="sm">Pay Now</Button>
            </div>
          </li>
          <li className="flex justify-between items-center">
            <span>456 College Ave - Apt 3B</span>
            <div>
              <span className="mr-4">$750 due on August 1, 2023</span>
              <Button size="sm">Pay Now</Button>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default StudentDashboard;