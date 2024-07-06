// components/dashboards/AdminDashboard.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { User } from '@supabase/auth-helpers-nextjs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card 
        title="User Management" 
        subtitle="Manage platform users"
        className="md:col-span-2"
      >
        <div className="flex space-x-4">
          <Button onClick={() => router.push('/admin/users')}>Manage Users</Button>
          <Button variant="outline" onClick={() => router.push('/admin/roles')}>Manage Roles</Button>
        </div>
      </Card>

      <Card 
        title="Property Management" 
        subtitle="Oversee all properties"
      >
        <Button onClick={() => router.push('/admin/properties')}>Manage Properties</Button>
      </Card>

      <Card 
        title="Site Statistics" 
        subtitle="Overview of platform activity"
        className="md:col-span-2"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-semibold">Total Users</h4>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Total Properties</h4>
            <p className="text-3xl font-bold">567</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Active Bookings</h4>
            <p className="text-3xl font-bold">89</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Revenue (MTD)</h4>
            <p className="text-3xl font-bold">$12,345</p>
          </div>
        </div>
      </Card>

      <Card 
        title="Recent Activity" 
        subtitle="Latest platform events"
      >
        <ul className="space-y-2">
          <li>New user registered: John Doe</li>
          <li>New property listed: 789 University Blvd</li>
          <li>Booking confirmed: 123 Student St</li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;