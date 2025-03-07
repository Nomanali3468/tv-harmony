
import React from 'react';
import { cn } from '@/lib/utils';
import VideoControls from './video-player/VideoControls';
import { useVideoPlayer } from './video-player/useVideoPlayer';

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  onClose?: () => void;
  isFullScreen?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  onClose,
  isFullScreen = false
}) => {
  const {
    videoRef,
    playerRef,
    isPlaying,
    isMuted,
    isFullscreen,
    controlsVisible,
    volume,
    currentTime,
    duration,
    qualityOptions,
    selectedQuality,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    handleVolumeChange,
    handleProgressChange,
    handleQualityChange,
    showControls,
    formatTime
  } = useVideoPlayer({ isFullScreen, onClose });

  return (
    <div 
      ref={playerRef}
      className={cn(
        "relative group text-white overflow-hidden",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "rounded-xl w-full aspect-video",
      )}
      onMouseMove={showControls}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onLoadedData={() => {
          if (isFullScreen) {
            togglePlay();
          }
        }}
      />
      
      <VideoControls 
        title={title}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        controlsVisible={controlsVisible}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        qualityOptions={qualityOptions}
        selectedQuality={selectedQuality}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        toggleFullscreen={toggleFullscreen}
        handleVolumeChange={handleVolumeChange}
        handleProgressChange={handleProgressChange}
        handleQualityChange={handleQualityChange}
        formatTime={formatTime}
        onClose={onClose}
      />
    </div>
  );
};

export default VideoPlayer;
