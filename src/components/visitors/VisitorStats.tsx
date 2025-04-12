"use client";

import React, { useState, useEffect } from 'react';
import VisitorStatsDisplay from './VisitorStatsDisplay';

interface VisitorStatsProps {
  className?: string;
  showTitle?: boolean;
  titleText?: string;
}

const VisitorStats: React.FC<VisitorStatsProps> = ({
  className = '',
  showTitle = true,
  titleText = 'STATISTIK PENGUNJUNG'
}) => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    onlineNow: 0,
    todayVisitors: 0,
    lastUpdated: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Import the visitor stats function
        const { getVisitorStats } = await import('@/lib/visitorCounter');
        
        // Get the visitor stats
        const data = await getVisitorStats();
        
        // Format the current time
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('id-ID', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        
        setStats({
          totalVisitors: data.totalVisitors || 0,
          onlineNow: data.onlineNow || 0,
          todayVisitors: data.todayVisitors || 0,
          lastUpdated: formattedTime
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching visitor stats:', error);
        setLoading(false);
      }
    };
    
    // Only run in the browser
    if (typeof window !== 'undefined') {
      fetchStats();
      
      // Update stats every 30 seconds
      const intervalId = setInterval(fetchStats, 30000);
      
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <VisitorStatsDisplay
      stats={stats}
      loading={loading}
      className={className}
      showTitle={showTitle}
      titleText={titleText}
    />
  );
};

export default VisitorStats;
