"use client";

import React, { useEffect, useRef } from 'react';

interface RetroSoundProps {
  play?: boolean;
  type?: 'startup' | 'beep' | 'complete';
}

const RetroSound: React.FC<RetroSoundProps> = ({
  play = false,
  type = 'startup'
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Only create AudioContext on client side
    if (typeof window !== 'undefined' && play) {
      try {
        // Create AudioContext only when needed
        if (!audioContextRef.current) {
          // Define the window with webkitAudioContext
          interface WindowWithWebAudio extends Window {
            webkitAudioContext?: typeof AudioContext;
          }

          audioContextRef.current = new (window.AudioContext || (window as WindowWithWebAudio).webkitAudioContext)();
        }

        const context = audioContextRef.current;

        // Different sound types
        switch (type) {
          case 'startup':
            playStartupSound(context);
            break;
          case 'beep':
            playBeepSound(context);
            break;
          case 'complete':
            playCompleteSound(context);
            break;
        }
      } catch (error) {
        console.error('Web Audio API not supported or error:', error);
      }
    }

    // Cleanup
    return () => {
      if (audioContextRef.current) {
        // Don't close the context, just keep the reference for reuse
      }
    };
  }, [play, type]);

  // Startup sound (like old computer booting)
  const playStartupSound = (context: AudioContext) => {
    const startTime = context.currentTime;

    // Create oscillator for the startup sound
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, startTime + 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(1000, startTime + 0.6);

    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 1);
  };

  // Simple beep sound
  const playBeepSound = (context: AudioContext) => {
    const startTime = context.currentTime;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, startTime);

    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.1);
  };

  // Complete sound (success)
  const playCompleteSound = (context: AudioContext) => {
    const startTime = context.currentTime;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, startTime); // C5
    oscillator.frequency.setValueAtTime(659.25, startTime + 0.2); // E5
    oscillator.frequency.setValueAtTime(783.99, startTime + 0.4); // G5

    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.setValueAtTime(0.1, startTime + 0.2);
    gainNode.gain.setValueAtTime(0.1, startTime + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.8);
  };

  // This component doesn't render anything
  return null;
};

export default RetroSound;
