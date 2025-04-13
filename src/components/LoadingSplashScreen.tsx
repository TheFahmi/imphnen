"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RetroSound from './RetroSound';

interface LoadingSplashScreenProps {
  minDisplayTime?: number; // Minimum time to display splash screen in ms
  onLoadingComplete?: () => void;
}

const LoadingSplashScreen: React.FC<LoadingSplashScreenProps> = ({
  minDisplayTime = 6000, // Increased from 3000 to 6000 ms
  onLoadingComplete
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isVisible, setIsVisible] = useState(true);
  const [playStartupSound, setPlayStartupSound] = useState(false);
  const [playBeepSound, setPlayBeepSound] = useState(false);
  const [playCompleteSound, setPlayCompleteSound] = useState(false);

  // Play startup sound when component mounts
  useEffect(() => {
    setPlayStartupSound(true);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const interval: NodeJS.Timeout = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.floor(Math.random() * 3) + 1; // Reduced from 5 to 3

        // Update loading text based on progress
        if (newProgress >= 20 && newProgress < 40) {
          setLoadingText('Loading HTML...');
          if (newProgress === 20) setPlayBeepSound(prev => !prev); // Toggle to trigger sound
        } else if (newProgress >= 40 && newProgress < 60) {
          setLoadingText('Loading CSS...');
          if (newProgress === 40) setPlayBeepSound(prev => !prev);
        } else if (newProgress >= 60 && newProgress < 80) {
          setLoadingText('Loading JavaScript...');
          if (newProgress === 60) setPlayBeepSound(prev => !prev);
        } else if (newProgress >= 80 && newProgress < 95) {
          setLoadingText('Connecting to server...');
          if (newProgress === 80) setPlayBeepSound(prev => !prev);
        } else if (newProgress >= 95) {
          setLoadingText('Almost there...');
          if (newProgress === 95) setPlayBeepSound(prev => !prev);
        }

        return Math.min(newProgress, 100);
      });
    }, 250); // Increased from 150 to 250 ms

    // Progress interval is defined above

    // Ensure minimum display time and complete loading
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setLoadingText('Welcome to IMPHNEN!');
        setPlayCompleteSound(true);

        // Hide splash screen after a longer delay
        setTimeout(() => {
          setIsVisible(false);
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, 1500); // Increased from 500 to 1500 ms
      }, remainingTime);
    }, 4500); // Increased from 2500 to 4500 ms

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [minDisplayTime, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-navy z-50 flex flex-col items-center justify-center">
      {/* Sound effects */}
      <RetroSound play={playStartupSound} type="startup" />
      <RetroSound play={playBeepSound} type="beep" />
      <RetroSound play={playCompleteSound} type="complete" />
      {/* Retro scanlines effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      <div className="w-full max-w-md p-6 bg-silver border-4 border-gray-400 border-outset">
        <div className="text-center mb-4">
          <h1 className="font-press-start text-2xl mb-2 text-navy rainbow-text">IMPHNEN.DEV</h1>
          <p className="font-vt323 text-xl">Ingin Menjadi Programmer Handal Namun Enggan Ngoding</p>
          <p className="font-vt323 text-sm mt-1 text-gray-600">Versi 1.0 - Dibuat dengan HTML</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="font-silkscreen text-base">{loadingText}</span>
            <span className="font-silkscreen text-base">{progress}%</span>
          </div>
          <div className="w-full h-6 bg-white border-2 border-gray-500 border-inset">
            <div
              className="h-full loading-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="animate-bounce">
            <Image src="/images/computer.svg" alt="Computer" width={50} height={50} />
          </div>

          <div className="text-center">
            <p className="font-vt323 text-base blink">Please Wait...</p>
            <p className="font-vt323 text-sm mt-1">© 1998 IMPHNEN.DEV</p>
            <p className="font-vt323 text-sm mt-1 text-red-600">DO NOT TURN OFF YOUR COMPUTER</p>
          </div>

          <div className="animate-spin">
            <Image src="/images/floppy.svg" alt="Floppy Disk" width={40} height={40} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-white text-center">
        <p className="font-vt323 text-base">Best viewed with Netscape Navigator 4.0</p>
        <p className="font-vt323 text-sm mt-1">Resolution: 800x600</p>
      </div>
    </div>
  );
};

export default LoadingSplashScreen;
