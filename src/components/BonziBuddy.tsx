"use client";

import React, { useState, useEffect, useRef } from 'react';
import RetroSound from './RetroSound';

interface BonziBuddyProps {
  className?: string;
}

// Funny messages that BonziBuddy will say in Indonesian
const bonziMessages = [
  "Halo! Saya BonziBuddy, teman internet kamu!",
  "Tahukah kamu? Copy-paste adalah sahabat terbaik programmer!",
  "Ngapain debug kalau bisa restart komputer aja?",
  "Stack Overflow adalah MVP sejati dalam dunia programming!",
  "Saya di sini untuk membantumu menghindari coding!",
  "Sudah coba dimatikan terus dinyalakan lagi?",
  "Ingat: itu bukan bug, tapi fitur!",
  "Kode terbaik adalah kode yang tidak perlu kamu tulis!",
  "Programmer menghabiskan 90% waktu untuk debug kode yang hanya butuh 10% waktu untuk ditulis!",
  "Ngapain nulis kode kalau AI bisa melakukannya untukmu?",
  "Kalau coding bikin pusing, ya jangan coding!",
  "Error itu seperti hantu, kadang muncul kadang menghilang tanpa alasan!",
  "Programmer sejati tahu kapan harus googling!",
  "Jangan khawatir tentang kodingan yang berantakan, namanya juga 'working progress'!",
  "Deadline besok? Tenang, masih ada 24 jam lagi!",
  "Kode yang tidak ada adalah kode tanpa bug!",
  "Saya tidak malas, saya hanya menghemat energi untuk coding nanti!",
  "Kenapa harus belajar algoritma kalau bisa pakai library?",
  "Debugging adalah seperti detektif, tapi pelakunya adalah dirimu sendiri!",
  "Jangan lupa semicolon; eh, ini JavaScript ya? Yaudah gak usah!",
  "Programmer Indonesia: Tidur dulu, besok lanjut!",
  "Kalau stuck, coba minum kopi dulu. Masih stuck? Tambah kopinya!",
  "Kode yang bagus adalah kode yang berjalan... kadang-kadang!",
  "Saya tidak butuh dokumentasi, kode saya sudah cukup jelas... bagi saya!",
  "Kalau ada error, coba hapus cache. Masih error? Coba restart. Masih error? Ya sudahlah!",
  "Programmer: Orang yang menyelesaikan masalah yang kamu tidak tahu kamu punya!",
  "Ngapain belajar coding kalau bisa jadi YouTuber?",
  "Saya tidak malas, saya sedang mengoptimalkan workflow!",
  "Kalau bingung, tambahin aja print statement di mana-mana!",
  "Kode yang baik itu seperti humor yang baik, tidak perlu penjelasan!",
  "Jangan takut sama error, takutlah sama deadline!",
  "Programmer Indonesia: Ahli dalam menunda-nunda pekerjaan!",
  "Kalau ada yang tanya 'Sudah selesai belum?', jawab saja 'Tinggal sedikit lagi'!",
  "Ngapain capek-capek coding kalau bisa pakai template?",
  "Saya bukan malas, saya sedang menunggu inspirasi!",
  "Kalau ada yang bilang kodinganmu jelek, bilang saja 'Ini gaya coding eksperimental'!",
  "Programmer sejati tahu kapan harus menyerah dan mulai dari awal!",
  "Jangan khawatir tentang performa, itu masalah tim DevOps!",
  "Kalau ada yang tanya berapa lama untuk selesaikan fitur, jawab saja 'Tergantung internetnya'!",
  "Saya tidak procrastinate, saya sedang melakukan riset mendalam di YouTube!",
  "Kalau ada yang komplain tentang UI, bilang saja 'Ini minimalis'!",
  "Programmer Indonesia: Ahli dalam membuat alasan kenapa fitur belum selesai!",
  "Ngapain bikin sendiri kalau bisa ambil dari GitHub?",
  "Kalau ada yang tanya 'Kok lambat?', jawab saja 'Ini untuk keamanan data'!",
  "Saya tidak malas, saya sedang menghemat tenaga untuk debugging nanti!",
  "Programmer sejati tahu kapan harus pura-pura sibuk!",
  "Jangan khawatir tentang clean code, yang penting client tidak lihat kodenya!",
  "Kalau ada yang tanya kenapa tidak pakai framework, bilang saja 'Ini untuk performa'!",
  "Saya tidak menunda pekerjaan, saya sedang menunggu waktu yang tepat!",
  "Programmer Indonesia: Ahli dalam membuat kode yang hanya dia sendiri yang mengerti!",
  "Ngapain belajar algoritma kalau bisa pakai ChatGPT?",
];

const BonziBuddy: React.FC<BonziBuddyProps> = ({ className = '' }) => {
  const [message, setMessage] = useState<string>('');
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  const [playSound, setPlaySound] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BonziBuddy with a greeting
  useEffect(() => {
    // Initial greeting after a short delay
    const initialTimeout = setTimeout(() => {
      speak("Hello! I'm BonziBuddy, your internet friend!");
      setIsWaving(true);

      // Stop waving after 2 seconds
      setTimeout(() => {
        setIsWaving(false);
      }, 2000);
    }, 3000);

    // Set up random messages every 30-60 seconds
    messageIntervalRef.current = setInterval(() => {
      const randomMessage = bonziMessages[Math.floor(Math.random() * bonziMessages.length)];
      speak(randomMessage);
    }, Math.random() * 30000 + 30000); // Random time between 30-60 seconds

    return () => {
      clearTimeout(initialTimeout);
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Function to make BonziBuddy speak
  const speak = (text: string) => {
    setMessage(text);
    setIsTalking(true);
    setPlaySound(true);

    // Reset sound trigger to allow it to be triggered again
    setTimeout(() => {
      setPlaySound(false);
    }, 100);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timeout to clear the message based on its length
    const duration = Math.max(3000, text.length * 100); // Minimum 3 seconds, or longer for longer messages
    timeoutRef.current = setTimeout(() => {
      setIsTalking(false);
      setMessage('');
    }, duration);
  };

  // Handle click on BonziBuddy
  const handleClick = () => {
    if (!isTalking) {
      const randomMessage = bonziMessages[Math.floor(Math.random() * bonziMessages.length)];
      speak(randomMessage);
      setIsWaving(true);

      // Stop waving after 2 seconds
      setTimeout(() => {
        setIsWaving(false);
      }, 2000);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Sound effect */}
      <RetroSound play={playSound} type="beep" />

      {/* Speech bubble */}
      {message && (
        <div className="bg-white border-2 border-gray-400 border-outset p-2 mb-2 rounded-lg relative text-center max-w-[200px]">
          <p className="font-comic text-sm text-navy">{message}</p>
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
      )}

      {/* BonziBuddy character */}
      <div
        className="cursor-pointer relative"
        onClick={handleClick}
        title="Click me!"
      >
        <div className="relative w-[200px] h-[200px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="w-full h-full"
          >
            {/* Main body - purple gorilla - exact BonziBuddy appearance based on original image */}
            <g className="animate-bonzi-bounce">
              {/* Body - accurate purple color */}
              <ellipse cx="100" cy="130" rx="50" ry="55" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="2" />

              {/* Head - accurate shape */}
              <ellipse cx="100" cy="70" rx="45" ry="40" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="2" />

              {/* Ears - accurate shape and position */}
              <ellipse cx="65" cy="40" rx="15" ry="18" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />
              <ellipse cx="135" cy="40" rx="15" ry="18" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />

              {/* Belly/Chest - accurate light purple color */}
              <ellipse cx="100" cy="130" rx="40" ry="45" fill="#D9B6F3" stroke="#7B3DB3" strokeWidth="1" />
              <ellipse cx="100" cy="85" rx="35" ry="25" fill="#D9B6F3" stroke="#7B3DB3" strokeWidth="1" />

              {/* Face */}
              <g>
                {/* Eyes - large cartoon eyes with white background */}
                <ellipse cx="85" cy="60" rx="12" ry="14" fill="white" stroke="#7B3DB3" strokeWidth="1" />
                <ellipse cx="115" cy="60" rx="12" ry="14" fill="white" stroke="#7B3DB3" strokeWidth="1" />

                {/* Pupils - large black pupils */}
                <ellipse cx="85" cy="60" rx="6" ry="8" fill="#000000" className="blinking" />
                <ellipse cx="115" cy="60" rx="6" ry="8" fill="#000000" className="blinking" />

                {/* Nose - purple nose */}
                <path d="M95,75 Q100,82 105,75" fill="#7B3DB3" stroke="#7B3DB3" strokeWidth="1" />

                {/* Mouth - big smile */}
                <path
                  d="M75,90 Q100,110 125,90"
                  fill="none"
                  stroke="#7B3DB3"
                  strokeWidth="3"
                  className={`${isTalking ? 'animate-talk' : ''}`}
                />
              </g>

              {/* Arms - accurate shape and position */}
              <g className={`${isWaving ? 'animate-wave' : ''}`}>
                <path d="M55,130 Q35,100 45,70" fill="none" stroke="#7B3DB3" strokeWidth="8" strokeLinecap="round" />
                <ellipse cx="45" cy="65" rx="10" ry="8" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />
              </g>
              <path d="M145,130 Q165,100 155,70" fill="none" stroke="#7B3DB3" strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="155" cy="65" rx="10" ry="8" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />

              {/* Feet - accurate shape and position */}
              <ellipse cx="80" cy="180" rx="20" ry="10" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />
              <ellipse cx="120" cy="180" rx="20" ry="10" fill="#9F51D9" stroke="#7B3DB3" strokeWidth="1" />

              {/* Optional: Add globe and banana for complete authenticity */}
              {false && (
                <g>
                  <circle cx="30" cy="50" r="20" fill="#9F51D9" />
                  <path d="M150,100 Q160,90 170,100" fill="yellow" stroke="green" strokeWidth="1" />
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="text-center mt-1">
        <p className="font-vt323 text-xs text-white">BonziBuddy</p>
        <p className="font-vt323 text-xs text-yellow-300">Your Desktop Friend!</p>
      </div>
    </div>
  );
};

export default BonziBuddy;
