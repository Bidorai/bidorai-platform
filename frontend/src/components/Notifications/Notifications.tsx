import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { io } from 'socket.io-client';

interface Notification {
  id: string;
  senderId: string;
  type: string;
  message: string;
  data: any;
  createdAt: string;
  readAt: string | null;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const { data: session } = useSession();
  const { toast } = useToast();
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
      auth: { userId: session.user.id },
    });

    socketRef.current.on('notification', (data) => {
      toast({
        title: 'New Notification',
        description: data.message,
      });
      fetchNotifications();
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [session]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch notifications',
        variant: 'destructive',
      });
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to mark as read');
      }

      fetchNotifications();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchNotifications();
    }
  }, [session]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <button
          onClick={fetchNotifications}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${
              notification.readAt ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              {!notification.readAt && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
