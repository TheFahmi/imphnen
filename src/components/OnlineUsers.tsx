"use client";

import React, { useState, useEffect } from 'react';

interface OnlineUsersProps {
  className?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActive: number;
}

// Mapping untuk avatar berdasarkan ID pengunjung
const avatarMap: Record<string, string> = {
  '0': '👨‍💻',
  '1': '👩‍💻',
  '2': '👑',
  '3': '🔍',
  '4': '🐛',
  '5': '😴',
  '6': '☕',
  '7': '⏰',
  '8': '📺',
  '9': '🤖',
};

// Nama-nama pengguna yang lucu
const userNames = [
  'MalasNgoding123',
  'CopyPasteKing',
  'StackOverflower',
  'BugCreator',
  'NoCommitGirl',
  'SleepyDev',
  'CoffeeAddict',
  'DeadlineRusher',
  'TutorialWatcher',
  'AIPromptEngineer',
  'LazyDeveloper',
  'CodeProcrastinator',
  'DebugAvoider',
  'GitIgnorer',
  'StackOverflowCopier',
];

const OnlineUsers: React.FC<OnlineUsersProps> = ({ className }) => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch online users from the API
    const fetchOnlineUsers = async () => {
      try {
        // Import the visitor stats function
        const { getVisitorStats } = await import('@/lib/visitorCounter');

        // Get the visitor stats
        const data = await getVisitorStats();

        // Get the number of online users
        const onlineCount = data.onlineNow || 0;

        // Create user objects for each online visitor
        const users: User[] = [];

        for (let i = 0; i < Math.min(onlineCount, 10); i++) {
          // Generate a deterministic but random-looking ID
          const id = `user_${Date.now()}_${i}`;

          // Get a random avatar and name
          const avatarKey = (i % 10).toString();
          const nameIndex = Math.floor(Math.random() * userNames.length);

          users.push({
            id,
            name: userNames[nameIndex],
            avatar: avatarMap[avatarKey],
            lastActive: Date.now() - Math.floor(Math.random() * 300000) // 0-5 minutes ago
          });
        }

        setOnlineUsers(users);
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    // Only run in the browser
    if (typeof window !== 'undefined') {
      fetchOnlineUsers();

      // Update online users every 15 seconds
      const intervalId = setInterval(fetchOnlineUsers, 15000);

      return () => clearInterval(intervalId);
    }
  }, []);

  // Sort users by last active time (most recent first)
  const sortedUsers = [...onlineUsers].sort((a, b) => a.lastActive - b.lastActive);

  return (
    <div className={`online-users ${className || ''}`}>
      <h3 className="font-bold mb-2 text-center text-sm sm:text-base">ONLINE SEKARANG</h3>

      <div className="bg-navy p-2 rounded">
        <div className="flex flex-wrap justify-center gap-1 mb-2">
          {sortedUsers.map(user => (
            <div
              key={user.id}
              className="relative tooltip-container"
              title={`${user.name} - ${getTimeAgo(user.lastActive)}`}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 rounded-full text-sm sm:text-lg">
                {user.avatar}
              </div>
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span>

              {/* Tooltip */}
              <div className="tooltip">
                {user.name}
                <br />
                <span className="text-gray-400">{getTimeAgo(user.lastActive)}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white text-xs">
          {onlineUsers.length} programmer malas online
        </p>
      </div>

    </div>
  );
};

// Helper function to format time ago
function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'baru saja';
  if (seconds < 120) return '1 menit lalu';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 7200) return '1 jam lalu';
  return `${Math.floor(seconds / 3600)} jam lalu`;
}

export default OnlineUsers;
