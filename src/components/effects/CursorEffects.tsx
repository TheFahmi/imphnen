"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const CursorEffects: React.FC = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  // Remove unused mousePosition state
  const colorIndexRef = useRef(0);

  // Colors for meteor effect (using useMemo to avoid dependency issues)
  const meteorColors = useMemo(() => [
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF8C00', // DarkOrange
    '#FF69B4', // HotPink
    '#FF1493', // DeepPink
    '#00FFFF', // Cyan
    '#00BFFF', // DeepSkyBlue
    '#1E90FF', // DodgerBlue
    '#9370DB', // MediumPurple
    '#8A2BE2', // BlueViolet
    '#9400D3', // DarkViolet
    '#32CD32', // LimeGreen
  ], []);

  useEffect(() => {
    const movingTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // No need to update mouse position state anymore

      // Rotate colors for each new point
      colorIndexRef.current = (colorIndexRef.current + 1) % meteorColors.length;
      const currentColor = meteorColors[colorIndexRef.current];

      // Tambahkan titik baru ke ekor meteor
      setTrail(prevTrail => {
        // Buat titik baru
        const newPoint: TrailPoint = {
          id: Date.now(),
          x: clientX,
          y: clientY,
          size: 6 + Math.random() * 4, // Ukuran acak antara 6-10
          opacity: 1, // Opacity awal
          color: currentColor, // Warna dari rotasi
        };

        // Tambahkan titik baru ke awal array dan batasi panjang ekor
        const updatedTrail = [newPoint, ...prevTrail].slice(0, 15); // Ekor lebih pendek (15 titik)

        return updatedTrail;
      });
    };

    // Update opacity dan ukuran titik ekor meteor
    const updateTrail = () => {
      setTrail(prevTrail =>
        prevTrail.map((point, index) => ({
          ...point,
          // Kurangi opacity berdasarkan posisi dalam ekor
          opacity: Math.max(0, 1 - (index / 25)),
          // Kurangi ukuran berdasarkan posisi dalam ekor
          size: Math.max(2, 10 - index * 0.2),
        })).filter(point => point.opacity > 0.1)
      );
    };

    // Set interval untuk memperbarui ekor meteor
    const trailInterval = setInterval(updateTrail, 20);

    // Tambahkan event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(trailInterval);
      if (movingTimeout) clearTimeout(movingTimeout);
    };
  }, [meteorColors]);

  return (
    <>
      {/* Tidak perlu garis ekor komet lagi karena kita menggunakan bintang-bintang */}

      {/* Bintang-bintang meteor */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${point.size * 2.5}px`,
            height: `${point.size * 2.5}px`,
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: point.opacity,
            transform: `translate(-50%, -50%) rotate(${index * 20 + Math.random() * 10}deg)`,
          }}
        >
          <svg
            viewBox="0 0 24 20"
            width="100%"
            height="100%"
            fill={index === 0 ? 'white' : point.color}
            style={{
              filter: `drop-shadow(0 0 ${point.size/2}px ${index === 0 ? 'white' : point.color})`,
            }}
          >
            <path d="M12 0L15.5 7.5H24L18 12.5L20 20L12 15L4 20L6 12.5L0 7.5H8.5L12 0Z" />
          </svg>
        </div>
      ))}
    </>
  );
};

export default CursorEffects;
