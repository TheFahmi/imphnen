"use client";

import React, { useState, useEffect } from 'react';

const FooterVisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        setLoading(true);
        
        // Import the visitor counter functions
        const { countVisitor } = await import('@/lib/visitorCounter');
        
        // Get the visitor count
        const count = await countVisitor();
        setVisitorCount(count);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setLoading(false);
      }
    };
    
    // Only run in the browser
    if (typeof window !== 'undefined') {
      fetchVisitorCount();
      
      // Update count every 60 seconds
      const intervalId = setInterval(fetchVisitorCount, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <p className="text-gray-300 text-xs sm:text-sm">
      Visitor counter: {loading ? (
        <span className="blink text-yellow-300">Loading...</span>
      ) : (
        <span className="blink text-yellow-300">{visitorCount || 0}</span>
      )} orang malas ngoding telah mengunjungi situs ini
    </p>
  );
};

export default FooterVisitorCounter;
