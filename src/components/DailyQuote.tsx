"use client";

import React, { useState, useEffect } from 'react';
import { Quote, getQuoteOfTheDay, getRandomQuote } from '@/lib/quotes';

interface DailyQuoteProps {
  className?: string;
  showTitle?: boolean;
  titleText?: string;
  useRandom?: boolean;
}

const DailyQuote: React.FC<DailyQuoteProps> = ({
  className = '',
  showTitle = true,
  titleText = 'QUOTES HARI INI',
  useRandom = false
}) => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    // Get quote based on the useRandom prop
    const selectedQuote = useRandom ? getRandomQuote() : getQuoteOfTheDay();
    setQuote(selectedQuote);
  }, [useRandom]);

  if (!quote) {
    return null;
  }

  return (
    <div className={`daily-quote ${className}`}>
      {showTitle && (
        <h3 className="font-bold mb-2 text-sm sm:text-base">{titleText}</h3>
      )}
      <div className="bg-gray-100 p-3 border border-gray-300 rounded">
        <blockquote className="italic text-sm mb-2">&quot;{quote.text}&quot;</blockquote>
        <div className="text-right text-xs text-gray-600">— {quote.author}</div>
      </div>
    </div>
  );
};

export default DailyQuote;
