"use client";

import React, { useState, useEffect } from 'react';
import VisitorCounterDisplay from './VisitorCounterDisplay';

interface VisitorCounterProps {
  className?: string;
  showLabel?: boolean;
  labelText?: string;
  showLiveIndicator?: boolean;
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({
  className = '',
  showLabel = true,
  labelText = 'VISITOR #:',
  showLiveIndicator = true
}) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const countVisitor = async () => {
      try {
        setLoading(true);
        
        // Import the visitor counter functions
        const { countVisitor } = await import('@/lib/visitorCounter');
        
        // Count the visitor and get the current count
        const count = await countVisitor();
        setVisitorCount(count);
        
        setLoading(false);
        
        // Set up a heartbeat to update the visitor's status every minute
        const heartbeatInterval = setInterval(async () => {
          const { updateVisitorStatus } = await import('@/lib/visitorCounter');
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

  return (
    <VisitorCounterDisplay
      count={visitorCount}
      loading={loading}
      error={error}
      className={className}
      showLabel={showLabel}
      labelText={labelText}
      showLiveIndicator={showLiveIndicator}
    />
  );
};

export default VisitorCounter;
