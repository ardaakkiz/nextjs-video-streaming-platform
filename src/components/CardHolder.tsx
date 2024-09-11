"use client";

import React, { useRef, useEffect, useState } from 'react';
import FilmCard from './FilmCard';

interface CardHolderProps {
  category: string;
  films: {
    id: number;
    title: string;
    image: string;
    imdbRating: number;
    year: string;
    duration: string;
    ageLimit: string;
  }[];
}

const CardHolder = ({ category, films }: CardHolderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const referenceElementRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [maxScrollX, setMaxScrollX] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const momentum = useRef<number>(0);

  useEffect(() => {
    const updateMaxScrollX = () => {
      if (scrollContainerRef.current && referenceElementRef.current) {
        const referenceWidth = referenceElementRef.current.offsetWidth;
        const contentWidth = scrollContainerRef.current.scrollWidth;
        setMaxScrollX(contentWidth - referenceWidth);
      }
    };

    updateMaxScrollX();
    window.addEventListener('resize', updateMaxScrollX);

    return () => {
      window.removeEventListener('resize', updateMaxScrollX);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default behavior and apply custom horizontal scrolling
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const speedFactor = 0.3;
        setScrollX((prev) => {
          const newScrollX = prev - e.deltaX * speedFactor;
          if (newScrollX > 0) return 0;
          if (Math.abs(newScrollX) > maxScrollX) return -maxScrollX;
          return newScrollX;
        });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      momentum.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX.current !== null && touchStartY.current !== null) {
        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;
        const deltaX = touchStartX.current - currentTouchX;
        const deltaY = touchStartY.current - currentTouchY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          e.preventDefault();
          setScrollX((prev) => {
            const newScrollX = prev - deltaX;
            if (newScrollX > 0) return 0;
            if (Math.abs(newScrollX) > maxScrollX) return -maxScrollX;
            return newScrollX;
          });
          momentum.current = deltaX;
        }

        touchStartX.current = currentTouchX;
        touchStartY.current = currentTouchY;
      }
    };

    const applyMomentumScrolling = () => {
      if (Math.abs(momentum.current) > 0.2) {
        setScrollX((prev) => {
          const newScrollX = prev - momentum.current;
          if (newScrollX > 0) return 0;
          if (Math.abs(newScrollX) > maxScrollX) return -maxScrollX;
          return newScrollX;
        });
        momentum.current *= 0.9;
        requestAnimationFrame(applyMomentumScrolling);
      }
    };

    const handleTouchEnd = () => {
      applyMomentumScrolling();
      touchStartX.current = null;
      touchStartY.current = null;
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('wheel', handleWheel, { passive: false });
      scrollContainerRef.current.addEventListener('touchstart', handleTouchStart);
      scrollContainerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
      scrollContainerRef.current.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('wheel', handleWheel);
        scrollContainerRef.current.removeEventListener('touchstart', handleTouchStart);
        scrollContainerRef.current.removeEventListener('touchmove', handleTouchMove);
        scrollContainerRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [maxScrollX]);

  return (
    <div className="p-3 max-w-full relative">
      <div ref={referenceElementRef} className="w-full h-0" />
      <h2 className="text-md md:text-lg font-bold text-white mb-2">{category}</h2>
      <div
        className="flex space-x-4 cursor-grab relative"
        ref={scrollContainerRef}
        style={{
          position: 'relative',
          left: `${scrollX}px`,
          width: 'max-content',
        }}
      >
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default CardHolder;
