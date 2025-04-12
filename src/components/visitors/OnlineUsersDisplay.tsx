"use client";

import React from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActive: number;
}

interface OnlineUsersDisplayProps {
  users: User[];
  className?: string;
  showTitle?: boolean;
  titleText?: string;
}

const OnlineUsersDisplay: React.FC<OnlineUsersDisplayProps> = ({
  users,
  className = '',
  showTitle = true,
  titleText = 'ONLINE SEKARANG'
}) => {
  // Sort users by last active time (most recent first)
  const sortedUsers = [...users].sort((a, b) => a.lastActive - b.lastActive);
  
  return (
    <div className={`online-users ${className}`}>
      {showTitle && (
        <h3 className="font-bold mb-2 text-center text-sm sm:text-base">{titleText}</h3>
      )}
      
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
          {users.length} programmer malas online
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

export default OnlineUsersDisplay;
