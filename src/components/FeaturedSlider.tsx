"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  PlayIcon,
  PlusIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: {
      src: "https://m.media-amazon.com/images/S/pv-target-images/b4c9871a6cff1c602d83407abe62ebb55b4b8eba22550f6e1b78e9a8fa28585a._SX1920_FMwebp_.jpg",
      alt: "The Boys",
    },
    titleImage: {
      src: "https://m.media-amazon.com/images/S/pv-target-images/a40deb56c1f0b2e8d354f078c4c00f4ebcaa7f0eb4f488af01d02d25af034916._SX600_FMpng_.png",
      alt: "The Boys",
    },
  },
  {
    id: 2,
    image: {
      src: "https://m.media-amazon.com/images/S/sonata-images-prod/TR_John_Wick_4_CS_UI/d06928fe-d29b-4b25-9198-9061e09b15a1._UR1920,1080_SX2160_FMwebp_.jpeg",
      alt: "John Wick 4",
    },
    titleImage: {
      src: "https://m.media-amazon.com/images/S/sonata-images-prod/TR_John_Wick_4_CS_UI/7e37d18c-8f40-403a-9f33-5790a608bd98._BR-6_AC_SX1000_FMwebp_.png",
      alt: "John Wick 4",
    },
  },
];

const FeaturedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Updates slide transition based on the current slide index
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.5s ease-in-out';
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle end of drag based on movement distance
  const handleScrollEnd = (move: number) => {
    const threshold = 75;
    if (move > threshold) nextSlide();
    else if (move < -threshold) prevSlide();
    else if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 0.3s ease-in-out';
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    e.preventDefault(); // Prevent default to avoid unwanted browser actions
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpOrLeave);
  };

  // Handle mouse move during dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const move = x - startX.current;
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 100}% + ${move}px))`;
    }
  };

  // Handle mouse up or leave to finalize the drag action
  const handleMouseUpOrLeave = (e: MouseEvent) => {
    if (isDragging.current) {
      const move = e.pageX - startX.current;
      handleScrollEnd(move);
      isDragging.current = false;
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUpOrLeave);
  };

  // Handle touch start for touch dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
  };

  // Handle touch move for touch dragging
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const move = x - startX.current;
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(calc(-${currentSlide * 100}% + ${move}px))`;
    }
  };

  // Handle touch end to finalize touch drag
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDragging.current) {
      const move = e.changedTouches[0].pageX - startX.current;
      handleScrollEnd(move);
      isDragging.current = false;
    }
  };

  // Horizontal Wheel Scroll Logic
  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault(); // Prevent default horizontal scroll to allow custom behavior
      if (e.deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Attach wheel event listener for custom horizontal scroll behavior
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-black text-white shadow-lg">
      <div
        ref={sliderRef}
        className="flex transition-transform ease-in-out duration-500"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ WebkitOverflowScrolling: 'touch', cursor: 'grab' }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image.src}
              className="w-full h-auto object-cover pointer-events-none"
              alt={slide.image.alt}
            />
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-4 md:bottom-10 md:left-8 space-y-4 max-w-[50%] md:max-w-[33%] z-50">
              <img
                src={slide.titleImage.src}
                alt={slide.titleImage.alt}
                className="w-full h-auto pointer-events-none"
              />
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link href="/video" passHref>
                  <button className="flex items-center px-3 py-2 md:px-6 md:py-3 bg-white text-black font-bold rounded hover:bg-gray-300 transition-transform transform hover:scale-105">
                    <PlayIcon className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                    <span className="text-sm md:text-lg">Watch</span>
                  </button>
                </Link>
                <button className="flex items-center p-2 md:p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform transform hover:scale-105">
                  <PlusIcon className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button className="flex items-center p-2 md:p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform transform hover:scale-105">
                  <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Next and Previous Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-transform transform hover:scale-105 z-50"
        aria-label="Previous Slide"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-transform transform hover:scale-105 z-50"
        aria-label="Next Slide"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default FeaturedSlider;
