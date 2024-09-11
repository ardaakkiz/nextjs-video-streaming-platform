// src/app/page.tsx

import React from 'react';
import Navbar from '../components/Navbar';  // Import the Navbar component
import FeaturedSlider from '../components/FeaturedSlider';  // Import the FeaturedSlider component
import CardHolder from '../components/CardHolder';  // Import the CardHolder component for displaying films
import Footer from '../components/Footer';  // Import the Footer component

// Sample film data to replicate "The Boys" for testing
const films = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,  // Unique identifier for each film
  title: "The Boys",  // Title of the film
  image: "https://m.media-amazon.com/images/S/pv-target-images/b4c9871a6cff1c602d83407abe62ebb55b4b8eba22550f6e1b78e9a8fa28585a._SX720_FMwebp_.jpg",  // Image URL for the film
  imdbRating: 8.7,  // IMDb rating of the film
  year: "2019",  // Release year of the film
  duration: "1h",  // Duration of the film
  ageLimit: "18+",  // Age limit for the film
}));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* 
        Navbar component is used to display the top navigation bar.
        It handles navigation links and can include brand logos, search, and user account options.
      */}
      <Navbar />

      {/* 
        FeaturedSlider component is used to display featured content in a slider format.
        Typically showcases highlighted shows or movies with large images and can include controls.
      */}
      <FeaturedSlider />

      {/* Main Content Section */}
      <main className="flex-1 flex flex-col items-start p-4 md:p-8">
        {/* 
          CardHolder components display lists of films in categories. 
          The same sample data is used for different categories to demonstrate layout and functionality.
        */}
        <CardHolder category="Popular Shows" films={films} />
        <CardHolder category="Trending Now" films={films} />
        <CardHolder category="New Releases" films={films} />
        <CardHolder category="Top Rated" films={films} />
      </main>

      {/* 
        Footer component for displaying the footer of the page.
        Includes links to legal and contact information as well as social media links.
      */}
      <Footer />
    </div>
  );
}
