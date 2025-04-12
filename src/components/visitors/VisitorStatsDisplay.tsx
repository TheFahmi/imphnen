"use client";

import React from 'react';

interface VisitorStatsDisplayProps {
  stats: {
    totalVisitors: number;
    onlineNow: number;
    todayVisitors: number;
    lastUpdated: string;
  };
  loading: boolean;
  className?: string;
  showTitle?: boolean;
  titleText?: string;
}

const VisitorStatsDisplay: React.FC<VisitorStatsDisplayProps> = ({
  stats,
  loading,
  className = '',
  showTitle = true,
  titleText = 'STATISTIK PENGUNJUNG'
}) => {
  return (
    <div className={`visitor-stats ${className}`}>
      {showTitle && (
        <h3 className="font-bold mb-2 text-sm sm:text-base">{titleText}</h3>
      )}
      
      {loading ? (
        <div className="text-center p-2">
          <span className="blink">Loading...</span>
        </div>
      ) : (
        <div className="text-xs sm:text-sm">
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

export default VisitorStatsDisplay;
