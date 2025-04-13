"use client";

import React, { useState, useEffect } from 'react';

interface VisitorStatsProps {
  className?: string;
}

interface Stats {
  totalVisitors: number;
  onlineNow: number;
  todayVisitors: number;
  lastUpdated: string;
}

const VisitorStats: React.FC<VisitorStatsProps> = ({ className }) => {
  const [stats, setStats] = useState<Stats>({
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
    <div className={`visitor-stats ${className || ''}`}>
      <h3 className="font-silkscreen font-bold mb-2 text-base sm:text-lg">STATISTIK PENGUNJUNG</h3>

      {loading ? (
        <div className="text-center p-2">
          <span className="blink">Loading...</span>
        </div>
      ) : (
        <div className="text-sm sm:text-base font-vt323">
          <div className="flex justify-between mb-1">
            <span>Total Pengunjung:</span>
            <span className="font-bold">{stats.totalVisitors.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Online Sekarang:</span>
            <span className="font-bold text-green-600">{stats.onlineNow}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Hari Ini:</span>
            <span className="font-bold">{stats.todayVisitors}</span>
          </div>
          <div className="text-right text-xs text-gray-500 mt-2">
            <span className="text-xs">Update: {stats.lastUpdated}</span>
            <span className="inline-block ml-1 sm:ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorStats;
