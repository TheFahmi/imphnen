"use client";

import React from 'react';

interface VisitorCounterDisplayProps {
  count: number | null;
  loading: boolean;
  error: string | null;
  className?: string;
  showLabel?: boolean;
  labelText?: string;
  showLiveIndicator?: boolean;
}

const VisitorCounterDisplay: React.FC<VisitorCounterDisplayProps> = ({
  count,
  loading,
  error,
  className = '',
  showLabel = true,
  labelText = 'VISITOR #:',
  showLiveIndicator = true
}) => {
  // Format the visitor count with leading zeros
  const formattedCount = count !== null 
    ? count.toString().padStart(5, '0') 
    : '00000';
  
  return (
    <div className={`visitor-counter ${className}`}>
      {showLabel && (
        <p className="font-bold mb-1 text-sm sm:text-base">{labelText}</p>
      )}
      <div className="bg-black text-green-400 font-mono font-bold p-1 sm:p-2 mx-auto w-4/5 text-center border-2 border-gray-400 border-inset text-sm sm:text-base">
        {loading ? (
          <span className="blink">LOADING</span>
        ) : error ? (
          <span className="text-red-500">ERROR</span>
        ) : (
          <span className="tracking-wider">{formattedCount}</span>
        )}
      </div>
      {showLiveIndicator && !loading && !error && (
        <div className="text-xs mt-1 text-center">
          <span className="blink text-red-600">● LIVE</span>
        </div>
      )}
    </div>
  );
};

export default VisitorCounterDisplay;
