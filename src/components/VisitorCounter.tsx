"use client";

import React, { useState, useEffect } from 'react';

interface VisitorCounterProps {
  className?: string;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const countVisitor = async () => {
      try {
        setLoading(true);

        // Import the visitor counter functions
        const { countVisitor, updateVisitorStatus } = await import('@/lib/visitorCounter');

        // Count the visitor and get the current count
        const count = await countVisitor();
        setVisitorCount(count);

        setLoading(false);

        // Set up a heartbeat to update the visitor's status every minute
        const heartbeatInterval = setInterval(async () => {
          await updateVisitorStatus();
        }, 60000); // Every minute

        return () => clearInterval(heartbeatInterval);
      } catch (err) {
        console.error('Error counting visitor:', err);
        setError('Failed to count visitor');
        setLoading(false);
      }
    };

    // Only run in the browser
    if (typeof window !== 'undefined') {
      countVisitor();
    }
  }, []);

  // Format the visitor count with leading zeros
  const formattedCount = visitorCount !== null
    ? visitorCount.toString().padStart(5, '0')
    : '00000';

  return (
    <div className={`visitor-counter ${className || ''}`}>
      <p className="font-silkscreen font-bold mb-1 text-base sm:text-lg">VISITOR #:</p>
      <div className="bg-black text-green-400 font-vt323 font-bold p-1 sm:p-2 mx-auto w-4/5 text-center border-2 border-gray-400 border-inset text-lg sm:text-xl">
        {loading ? (
          <span className="blink">LOADING</span>
        ) : error ? (
          <span className="text-red-500">ERROR</span>
        ) : (
          <span className="tracking-wider">{formattedCount}</span>
        )}
      </div>
      <div className="text-xs mt-1 text-center">
        {!loading && !error && (
          <span className="blink text-red-600">● LIVE</span>
        )}
      </div>
    </div>
  );
};

export default VisitorCounter;
