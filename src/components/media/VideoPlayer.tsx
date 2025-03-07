
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import VideoControls from './video-player/VideoControls';
import { useVideoPlayer } from './video-player/useVideoPlayer';

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  onClose?: () => void;
  isFullScreen?: boolean;
  headers?: Record<string, string>;
  qualityOptions?: { label: string; value: string }[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  onClose,
  isFullScreen = false,
  headers,
  qualityOptions: externalQualityOptions
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
    formatTime,
    setQualityOptions
  } = useVideoPlayer({ isFullScreen, onClose });

  // Update quality options when external options change
  useEffect(() => {
    if (externalQualityOptions && externalQualityOptions.length > 0) {
      setQualityOptions(externalQualityOptions);
    }
  }, [externalQualityOptions, setQualityOptions]);

  // For HLS with headers, we would normally use a library like hls.js with xhr overrides
  // This is a simplified implementation that assumes the headers are handled elsewhere
  
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
