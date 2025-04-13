"use client";

import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 bg-yellow-400 text-navy p-2 border-2 border-outset border-gray-400 hover:bg-yellow-300 transition-all duration-300 animate-bounce-slow"
          aria-label="Scroll to top"
          title="Kembali ke atas"
        >
          <div className="flex flex-col items-center">
            <div className="font-silkscreen text-xs">▲</div>
            <div className="font-silkscreen text-xs">TOP</div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
