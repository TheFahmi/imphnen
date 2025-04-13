"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

interface BonziBuddyMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  opacity: number;
}

const BonziBuddyCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<BonziBuddyMessage[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState(0);

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
    // Tampilkan BonziBuddy setelah halaman dimuat
    setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleMouseMove = (e: MouseEvent) => {
      // Tambahkan delay untuk efek "mengikuti" yang lebih alami
      setTimeout(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }, 100);

      // Secara acak tampilkan pesan dari BonziBuddy
      const now = Date.now();
      if (now - lastMessageTime > 5000 && Math.random() > 0.9) { // Lebih sering muncul (5 detik, 10% kemungkinan)
        const newMessage: BonziBuddyMessage = {
          id: now,
          text: bonziMessages[Math.floor(Math.random() * bonziMessages.length)],
          x: e.clientX,
          y: e.clientY - 50,
          opacity: 1
        };

        setMessages(prev => [...prev, newMessage]);
        setLastMessageTime(now);
      }
    };

    // Fungsi untuk memperbarui opacity pesan (efek memudar)
    const updateMessages = () => {
      setMessages(prevMessages =>
        prevMessages
          .map(msg => ({
            ...msg,
            opacity: msg.opacity - 0.01,
            y: msg.y - 0.5 // Bergerak ke atas perlahan
          }))
          .filter(msg => msg.opacity > 0) // Hapus pesan yang sudah tidak terlihat
      );
    };

    // Set interval untuk memperbarui pesan
    const messageInterval = setInterval(updateMessages, 50);

    // Tambahkan event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(messageInterval);
    };
  }, [lastMessageTime, bonziMessages]);

  if (!isVisible) return null;

  return (
    <>
      {/* BonziBuddy yang mengikuti kursor */}
      <div
        style={{
          position: 'fixed',
          left: `${position.x}px`, // Tepat di posisi kursor
          top: `${position.y}px`,
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%) scale(0.25)', // Skala lebih kecil dan posisi di tengah
          transformOrigin: 'center center',
        }}
      >
        <Image
          src="/images/bonzi.svg"
          alt="BonziBuddy"
          width={100}
          height={100}
          className="drop-shadow-lg"
        />
      </div>

      {/* Pesan-pesan dari BonziBuddy */}
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

export default BonziBuddyCursor;
