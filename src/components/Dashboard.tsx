'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/auth-helpers-nextjs';
import StudentDashboard from './dashboards/StudentDashboard';
import LandlordDashboard from './dashboards/LandlordDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

type UserType = 'student' | 'landlord' | 'admin';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserType = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('user_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user type:', error);
        } else if (data) {
          setUserType(data.user_type as UserType);
        }
      }
      setLoading(false);
    };

    fetchUserType();
  }, [user, supabase]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user || !userType) {
    router.push('/login');
    return null;
  }

  const renderDashboard = () => {
    switch (userType) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'landlord':
        return <LandlordDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;