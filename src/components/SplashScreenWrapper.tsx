"use client";

import React, { useState, useEffect } from 'react';
import LoadingSplashScreen from './LoadingSplashScreen';

interface SplashScreenWrapperProps {
  children: React.ReactNode;
  alwaysShow?: boolean; // Option to always show splash screen
}

const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({ children, alwaysShow = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // If alwaysShow is true, always show the splash screen
    if (alwaysShow) {
      setIsLoading(true);
      setHasVisited(false);
      return;
    }

    // Check if user has visited before in this session
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedImphnen');

    if (hasVisitedBefore) {
      setIsLoading(false);
      setHasVisited(true);
    } else {
      // Set the flag for future visits in this session
      sessionStorage.setItem('hasVisitedImphnen', 'true');
      setHasVisited(false);
    }
  }, [alwaysShow]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && !hasVisited && (
        <LoadingSplashScreen onLoadingComplete={handleLoadingComplete} />
      )}
      <div className={isLoading && !hasVisited ? 'hidden' : 'block'}>
        {children}
      </div>
    </>
  );
};

export default SplashScreenWrapper;
