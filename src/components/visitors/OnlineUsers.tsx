"use client";

import React, { useState, useEffect } from 'react';
import OnlineUsersDisplay from './OnlineUsersDisplay';

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

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActive: number;
}

interface OnlineUsersProps {
  className?: string;
  showTitle?: boolean;
  titleText?: string;
}

const OnlineUsers: React.FC<OnlineUsersProps> = ({
  className = '',
  showTitle = true,
  titleText = 'ONLINE SEKARANG'
}) => {
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

  return (
    <OnlineUsersDisplay
      users={onlineUsers}
      className={className}
      showTitle={showTitle}
      titleText={titleText}
    />
  );
};

export default OnlineUsers;
