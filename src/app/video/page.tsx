// src/app/video.tsx (or src/pages/video.tsx for Next.js)
import React from 'react';
import VideoPlayer from '../../components/VideoPlayer'; // Import the VideoPlayer component

const VideoPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* 
        The VideoPlayer component is used here with the necessary props:
        - videoSrc: The source URL of the video to be played.
        - title: Title of the video.
        - episode: A subtitle or episode information about the video.
      */}
      <VideoPlayer
        videoSrc="https://v.gazeteoksijen.com/storage/files/videos/2024/05/05/the-boysun-4-sezonundan-fragman-s3mz.mp4" // Replace with the correct video URL
        title="The Boys"
        episode="Season 1 Trailer"
      />
    </div>
  );
};

export default VideoPage;
