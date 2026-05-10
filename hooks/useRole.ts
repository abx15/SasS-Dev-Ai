import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { TeamRole } from '@/types/team';

export function useRole() {
  const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  
  // Allow mocking role in development
  const mockRole = searchParams.get('mockRole') as TeamRole | null;
  
  const { data: dbUser, isLoading: isDbLoading } = useQuery({
    queryKey: ['db-user', user?.id],
    queryFn: async () => {
      const res = await fetch('/api/user/profile');
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!user?.id && !mockRole,
  });

  if (process.env.NODE_ENV === 'development' && mockRole) {
    return {
      role: mockRole,
      isLoading: false,
      isLoaded: true,
      user: user || { id: 'mock-user', firstName: 'Mock', lastName: 'User' }
    };
  }

  return {
    role: (dbUser?.role || 'VIEWER') as TeamRole,
    isLoading: isDbLoading || !isLoaded,
    isLoaded,
    user
  };
}
