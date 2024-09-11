"use client";

import React, { useState } from 'react';
import { PlayIcon, PlayCircleIcon, PlusIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'; // Importing icons used in the component
import Link from 'next/link'; // Import Link component for navigation

interface Film {
  id: number;
  title: string;
  image: string;
  imdbRating: number;
  year: string;
  duration: string;
  ageLimit: string;
}

const FilmCard = ({ film }: { film: Film }) => {
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect

  return (
    <div
      className={`relative w-48 md:w-56 lg:w-64 cursor-pointer transform transition-all duration-300 ${
        isHovered ? 'scale-125 z-20' : 'z-10' // Scale and z-index adjustment on hover
      }`}
      onMouseEnter={() => setIsHovered(true)} // Show additional info on hover
      onMouseLeave={() => setIsHovered(false)} // Hide additional info when not hovered
      style={{ maxHeight: 'fit-content' }}
    >
      {/* Film Image */}
      <img
        src={film.image}
        alt={film.title}
        className="w-full h-auto rounded-t-lg object-cover" // Display the image with rounded top corners
      />

      {/* Additional Info - Displayed when card is hovered */}
      {isHovered && (
        <div className="absolute top-full left-0 w-full bg-gray-800 p-3 rounded-b-lg transition-opacity duration-300 ease-in-out">
          <div className="space-y-2 text-white text-sm">
            {/* Title */}
            <h3 className="font-bold text-lg">{film.title}</h3>

            {/* IMDb Rating */}
            <p className="flex items-center space-x-1">
              <span className="text-yellow-500">IMDb:</span>
              <span>{film.imdbRating}</span>
            </p>

            {/* Watch Button */}
            <div className="flex space-x-2">
              <button className="flex items-center justify-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 w-full">
                <PlayIcon href="/video" className="h-4 w-4 mr-1" />
                <span>Watch</span>
              </button>
            </div>

            {/* Watch Trailer Button - Full Width */}
            <div className="flex space-x-2 mt-2">
              <Link href="/video" className="w-full">
                <button className="flex items-center justify-center px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 w-full">
                  <PlayCircleIcon className="h-4 w-4 mr-1" />
                  <span>Watch Trailer</span>
                </button>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-2">
              <button className="flex items-center justify-center p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <PlusIcon className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <HandThumbUpIcon className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <HandThumbDownIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Year, Duration, Age Limit */}
            <p className="flex space-x-2 text-gray-400 mt-2">
              <span>{film.year}</span>
              <span>•</span>
              <span>{film.duration}</span>
              <span>•</span>
              <span>{film.ageLimit}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmCard;
