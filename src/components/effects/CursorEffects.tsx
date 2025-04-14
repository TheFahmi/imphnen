"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';

interface SnowflakePoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
}

interface BonziBuddyMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
}

const CursorEffects: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<SnowflakePoint[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<BonziBuddyMessage[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  // We'll use this ref to track the last time the cursor moved
  const lastMoveTimeRef = useRef(0);
  const colorIndexRef = useRef(0);

  // Colors for snowflake effect
  const snowflakeColors = useMemo(() => [
    '#FFFFFF', // White
    '#E0FFFF', // Light Cyan
    '#F0F8FF', // Alice Blue
    '#F5F5F5', // White Smoke
    '#FFFAFA', // Snow
    '#B0E0E6', // Powder Blue
    '#ADD8E6', // Light Blue
    '#87CEEB', // Sky Blue
    '#E6E6FA', // Lavender
    '#FFD700', // Gold (for stars)
  ], []);

  // BonziBuddy messages
  const bonziMessages = useMemo(() => [
    "Halo! Saya BonziBuddy!",
    "Selamat datang di IMPHNEN!",
    "Jangan lupa untuk malas ngoding hari ini!",
    "Kamu programmer terbaik!",
    "Mau ngopi dulu?",
    "Istirahat dulu, coding-nya nanti saja!",
    "Scroll terus, coding-nya kapan?",
    "Saya suka website ini!",
    "Kamu sudah makan?",
    "Jangan lupa minum air!",
    "Ayo kita malas bersama!",
    "Coding itu susah, mending tidur!",
    "Saya selalu mengawasimu...",
    "Klik di sini untuk virus gratis! Hehe bercanda...",
    "Sudah cek Facebook hari ini?",
    "Mau dengar lelucon? Deadline-mu besok!",
    "Ayo main game saja!",
    "Kamu terlihat lelah, istirahat saja!",
    "Saya rindu Windows XP!",
    "Saya bukan virus, sumpah!",
    "Sudah commit kode hari ini?",
    "Jangan lupa push ke repository!",
    "Error lagi? Coba restart dulu!",
    "Apa kabar? Masih semangat ngoding?",
    "Saya kangen jadi asisten virtual!",
    "Kode kamu bagus, tapi bisa lebih bagus lagi!",
    "Mau saya bantu debug kode kamu?",
    "Saya lebih baik dari Clippy!",
    "Kamu tahu? Saya dulu terkenal lho!",
    "Jangan lupa indent kode kamu!",
    "Semicolon itu penting; jangan lupa!",
    "Kamu sudah coba framework baru?",
    "Saya suka warna ungu, bagaimana denganmu?",
    "Kamu punya banyak tab browser yang terbuka!",
    "Jangan lupa backup data kamu!",
    "Kamu tahu cara keluar dari Vim?",
    "Sudah coba pakai dark mode?",
    "Kopi dingin tuh, mau saya panaskan?",
    "Kamu tahu? Saya bisa bernyanyi!",
    "Mau dengar rahasia? Saya sebenarnya AI!",
    "Kamu sudah update Windows hari ini?",
    "Jangan lupa matikan komputer sebelum tidur!",
    "Kamu tahu kenapa saya ungu? Karena keren!",
    "Saya bisa bantu kamu cari bug!",
    "Kamu pernah dengar tentang Y2K?",
    "Saya rindu era dial-up internet!",
    "Kamu terlalu banyak scroll media sosial!",
    "Mau saya ceritakan tentang sejarah komputer?",
    "Kamu tahu? Saya punya banyak teman di internet!",
    "Terima kasih sudah mengundang saya ke website kamu!"
  ], []);

  useEffect(() => {
    // No need for a moving timeout anymore

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update cursor position
      setCursorPosition({ x: clientX, y: clientY });

      // Update last move time
      lastMoveTimeRef.current = Date.now();

      // Create new snowflakes when cursor moves
      if (Math.random() > 0.25) { // 75% chance to create a snowflake on movement
        // Rotate colors for each new snowflake
        colorIndexRef.current = (colorIndexRef.current + 1) % snowflakeColors.length;
        const currentColor = snowflakeColors[colorIndexRef.current];

        // Create new snowflake
        setSnowflakes(prevSnowflakes => {
          const newSnowflake: SnowflakePoint = {
            id: Date.now(),
            x: clientX + (Math.random() * 60 - 30), // Random offset from cursor (increased spread)
            y: clientY - 10, // Start slightly above cursor
            size: 5 + Math.random() * 10, // Random size between 5-15
            opacity: 0.8 + Math.random() * 0.2, // Random opacity between 0.8-1.0
            color: currentColor,
            speedY: 1 + Math.random() * 2, // Random falling speed
            speedX: Math.random() * 2 - 1, // Random horizontal drift
            rotation: Math.random() * 360, // Random initial rotation
            rotationSpeed: Math.random() * 5 - 2.5, // Random rotation speed
          };

          // Keep only the most recent 60 snowflakes (doubled from original 30)
          return [newSnowflake, ...prevSnowflakes].slice(0, 60);
        });
      }

      // Randomly display BonziBuddy messages
      const now = Date.now();
      if (now - lastMessageTime > 5000 && Math.random() > 0.9) { // 10% chance every 5 seconds
        const newMessage: BonziBuddyMessage = {
          id: now,
          text: bonziMessages[Math.floor(Math.random() * bonziMessages.length)],
          x: clientX,
          y: clientY - 50,
          opacity: 1
        };

        setMessages(prev => [...prev, newMessage]);
        setLastMessageTime(now);
      }
    };

    // Update snowflakes position (falling animation)
    const updateSnowflakes = () => {
      setSnowflakes(prevSnowflakes =>
        prevSnowflakes.map(snowflake => ({
          ...snowflake,
          // Move snowflake down
          y: snowflake.y + snowflake.speedY,
          // Add some horizontal drift
          x: snowflake.x + snowflake.speedX,
          // Rotate snowflake
          rotation: snowflake.rotation + snowflake.rotationSpeed,
          // Gradually reduce opacity as it falls
          opacity: Math.max(0, snowflake.opacity - 0.005),
        })).filter(snowflake =>
          // Remove snowflakes that are no longer visible or have fallen off screen
          snowflake.opacity > 0.1 &&
          snowflake.y < window.innerHeight + 50
        )
      );
    };

    // Update BonziBuddy messages (fade out and float up)
    const updateMessages = () => {
      setMessages(prevMessages =>
        prevMessages
          .map(msg => ({
            ...msg,
            opacity: msg.opacity - 0.01,
            y: msg.y - 0.5 // Move up slowly
          }))
          .filter(msg => msg.opacity > 0) // Remove messages that are no longer visible
      );
    };

    // Set intervals to update animations
    const snowflakeInterval = setInterval(updateSnowflakes, 30);
    const messageInterval = setInterval(updateMessages, 50);

    // Add event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(snowflakeInterval);
      clearInterval(messageInterval);
    };
  }, [snowflakeColors, bonziMessages, lastMessageTime]);

  return (
    <>
      {/* Custom cursor (arrow) */}
      <div
        style={{
          position: 'fixed',
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: '30px',
          height: '30px',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          opacity: 1,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.7))',
          }}
        >
          <path d="M5,3 L19,12 L5,21 L5,3" />
        </svg>
      </div>

      {/* Falling snowflakes/stars */}
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          style={{
            position: 'fixed',
            left: `${snowflake.x}px`,
            top: `${snowflake.y}px`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: snowflake.opacity,
            transform: `translate(-50%, -50%) rotate(${snowflake.rotation}deg)`,
          }}
        >
          {/* Star shape for snowflakes */}
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill={snowflake.color}
            style={{
              filter: `drop-shadow(0 0 2px ${snowflake.color})`,
            }}
          >
            <path d="M12,0 L15,8 L24,8 L17,13 L20,21 L12,16 L4,21 L7,13 L0,8 L9,8 Z" />
          </svg>
        </div>
      ))}

      {/* BonziBuddy Messages */}
      {messages.map(message => (
        <div
          key={message.id}
          style={{
            position: 'fixed',
            left: `${message.x}px`,
            top: `${message.y}px`,
            opacity: message.opacity,
            pointerEvents: 'none',
            zIndex: 9996,
            transform: 'translate(-50%, -100%)',
            maxWidth: '200px',
            backgroundColor: '#FFFFCC',
            border: '2px solid #9966CC',
            borderRadius: '10px',
            padding: '8px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#663399',
              fontWeight: 'bold',
            }}
          >
            {message.text}
          </div>
        </div>
      ))}
    </>
  );
};

export default CursorEffects;
