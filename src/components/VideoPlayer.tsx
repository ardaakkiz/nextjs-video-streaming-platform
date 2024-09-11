// src/components/VideoPlayer.tsx
"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface VideoPlayerProps {
  videoSrc: string;
  title: string;
  episode: string;
}

const VideoPlayer = ({ videoSrc, title, episode }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [lastVolume, setLastVolume] = useState(0.5);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubtitlesOpen, setIsSubtitlesOpen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const activityTimeout = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const resetControlsTimeout = () => {
    if (activityTimeout.current) clearTimeout(activityTimeout.current);
    activityTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // 3 seconds of inactivity
  };

  const handleActivity = () => {
    setShowControls(true);
    resetControlsTimeout();
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    handleActivity();
  };

  const handleBackward = () => {
    if (videoRef.current) videoRef.current.currentTime -= 5;
    handleActivity();
  };

  const handleForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 5;
    handleActivity();
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0; // Mute if volume is 0
    }
    handleActivity();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (volume === 0) {
      videoRef.current.muted = false;
      handleVolumeChange(lastVolume || 0.5);
    } else {
      setLastVolume(volume);
      handleVolumeChange(0);
    }
    handleActivity();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const clickRatio = Math.max(Math.min(clickPosition / rect.width, 1), 0);
    videoRef.current.currentTime = clickRatio * duration;
    setCurrentTime(videoRef.current.currentTime);
    handleActivity();
  };

  const handleProgressDrag = (clientX: number) => {
    if (isDragging.current && videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const dragPosition = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      videoRef.current.currentTime = dragPosition * duration;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleProgressClick(e);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => handleProgressDrag(e.clientX);

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleProgressClick(e);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => handleProgressDrag(e.touches[0].clientX);

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    handleActivity();
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowLeft':
        handleBackward();
        break;
      case 'ArrowRight':
        handleForward();
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoRef.current?.requestFullscreen();
        }
        break;
      case 'Escape':
        window.location.href = '/'; // Redirect to homepage (update as needed)
        break;
      case 'ArrowUp':
        handleVolumeChange(Math.min(volume + 0.1, 1));
        break;
      case 'ArrowDown':
        handleVolumeChange(Math.max(volume - 0.1, 0));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    const handleVideoEnd = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleVideoEnd);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleActivity);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleActivity);
      if (activityTimeout.current) clearTimeout(activityTimeout.current);
    };
  }, [volume, lastVolume]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.popup, .volume-slider')) {
      setIsSettingsOpen(false);
      setIsSubtitlesOpen(false);
      setShowVolumeSlider(false);
    }
  };

  useEffect(() => {
    if (isSettingsOpen || isSubtitlesOpen || showVolumeSlider) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSettingsOpen, isSubtitlesOpen, showVolumeSlider]);

  const handleVolumeSliderClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pausing/playing video when interacting with the slider
  };

  return (
    <div
      className="relative w-full h-dvh flex items-center justify-center bg-black overflow-hidden"
      onMouseMove={handleActivity}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('.control-layer') == null) {
          togglePlayPause();
        }
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full max-h-full"
        onClick={(e) => e.stopPropagation()} // Prevent toggling play/pause when clicking directly on video
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
      ></video>

      {/* Control Layer */}
      {showControls && (
        <div
          className="absolute inset-0 flex flex-col justify-between p-4 text-white bg-black bg-opacity-50 control-layer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent play/pause toggle when clicking on control layer
            handleActivity();
          }}
        >
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <h2 className="text-xl md:text-3xl font-bold">{title}</h2>
              <p className="text-sm md:text-lg text-gray-400">{episode}</p> {/* Darker color for duration */}
            </div>
            <div className="flex space-x-2 relative">
              <button
                className="p-2 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVolumeSlider(!showVolumeSlider);
                  setIsSubtitlesOpen(false);
                  setIsSettingsOpen(false);
                }}
              >
                <SpeakerWaveIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              {showVolumeSlider && (
                <div
                  className="absolute w-8 h-40 bg-black bg-opacity-80 rounded-md flex items-center justify-center volume-slider"
                  onClick={handleVolumeSliderClick}
                  style={{ top: '40px' }} // Position the slider directly below the volume icon
                >
                  <div
                    className="relative h-32 w-1 bg-gray-600 rounded cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent default dragging behavior
                      const sliderHeight = (e.currentTarget as HTMLElement).offsetHeight;
                      const initialY = e.clientY;
                      const initialVolume = volume;

                      const handleDrag = (moveEvent: MouseEvent) => {
                        const deltaY = initialY - moveEvent.clientY;
                        const newVolume = Math.min(Math.max(initialVolume + deltaY / sliderHeight, 0), 1);
                        handleVolumeChange(newVolume);
                      };

                      const stopDrag = () => {
                        document.removeEventListener('mousemove', handleDrag);
                        document.removeEventListener('mouseup', stopDrag);
                      };

                      document.addEventListener('mousemove', handleDrag);
                      document.addEventListener('mouseup', stopDrag);
                    }}
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const clickY = e.clientY - rect.top;
                      const newVolume = Math.max(Math.min(1 - clickY / rect.height, 1), 0);
                      handleVolumeChange(newVolume);
                      e.stopPropagation();
                    }}
                  >
                    <div
                      className="absolute bottom-0 left-0 w-full bg-gray-400"
                      style={{ height: `${volume * 100}%` }}
                    >
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-full"
                        style={{ bottom: '-6px', height: '24px', width: '24px', transform: `translate(-50%, -${volume * 490}%)` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <button
                className="p-2 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubtitlesOpen(!isSubtitlesOpen);
                  setIsSettingsOpen(false);
                  setShowVolumeSlider(false);
                }}
              >
                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              <button
                className="p-2 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSettingsOpen(!isSettingsOpen);
                  setIsSubtitlesOpen(false);
                  setShowVolumeSlider(false);
                }}
              >
                <Cog6ToothIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              <button
                className="p-2 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600"
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    videoRef.current?.requestFullscreen();
                  }
                }}
              >
                <ArrowsPointingOutIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              <button className="p-2 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600" onClick={() => (window.location.href = '/')}>
                <XMarkIcon className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>
          </div>

          {/* Middle Controls */}
          <div className="flex justify-center items-center mb-6 lg:space-x-6">
            <button className="p-4 md:p-5 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600" onClick={handleBackward}>
              <BackwardIcon className="h-12 w-12 lg:h-16 lg:w-16" />
            </button>
            <button className="p-4 md:p-5 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600" onClick={togglePlayPause}>
              {isPlaying ? (
                <PauseIcon className="h-12 w-12 lg:h-16 lg:w-16" />
              ) : isEnded ? (
                <ArrowPathIcon className="h-12 w-12 lg:h-16 lg:w-16" onClick={handleReplay} />
              ) : (
                <PlayIcon className="h-12 w-12 lg:h-16 lg:w-16" />
              )}
            </button>
            <button className="p-4 md:p-5 hover:scale-110 hover:text-gray-200 transition transform duration-200 text-gray-600" onClick={handleForward}>
              <ForwardIcon className="h-12 w-12 lg:h-16 lg:w-16" />
            </button>
          </div>

          {/* Progress Bar and Bottom Controls */}
          <div className="flex flex-col items-center mb-4">
            <div
              ref={progressBarRef}
              className="w-full h-2 bg-gray-700 rounded cursor-pointer relative"
              onMouseDown={handleProgressMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div
                className="h-full bg-gray-400 rounded"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between w-full text-lg text-gray-300 mt-2"> {/* Larger text for current time and duration */}
              <span className="text-gray-400">
                {new Date(currentTime * 1000).toISOString().substr(11, 8)} /{' '}
                {new Date(duration * 1000).toISOString().substr(11, 8)}
              </span>
              <button className="text-gray-600 hover:text-gray-200 transition">Next Episode</button> {/* Adjusted button color */}
            </div>
          </div>

          {/* Popups */}
          {isSubtitlesOpen && (
            <div className="absolute top-16 right-16 bg-black bg-opacity-80 p-4 rounded-md flex space-x-8 popup">
              <div>
                <h3 className="text-white font-bold mb-2">Subtitles</h3>
                <ul>
                  <li>English</li>
                  <li>Spanish</li>
                </ul>
              </div>
              <div className="border-l border-gray-500 pl-4">
                <h3 className="text-white font-bold mb-2">Audio</h3>
                <ul>
                  <li>English</li>
                  <li>Spanish</li>
                </ul>
              </div>
            </div>
          )}
          {isSettingsOpen && (
            <div className="absolute top-16 right-28 bg-black bg-opacity-80 p-4 rounded-md popup">
              <h3 className="text-white font-bold mb-2">Quality</h3>
              <ul>
                <li>1080p</li>
                <li>720p</li>
                <li>480p</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
