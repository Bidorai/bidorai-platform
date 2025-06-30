import { AuthProvider } from './contexts/AuthContext';

export default function RestaurantOwnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AuthProvider>
  );
} 