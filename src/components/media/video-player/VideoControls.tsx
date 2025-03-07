
import React from 'react';
import { X, Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import PlaybackControls from './PlaybackControls';
import VolumeControls from './VolumeControls';
import QualitySelector, { QualityOption } from './QualitySelector';
import ProgressBar from './ProgressBar';
import FullscreenControl from './FullscreenControl';

interface VideoControlsProps {
  title: string;
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  controlsVisible: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  qualityOptions: QualityOption[];
  selectedQuality: string;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  handleVolumeChange: (value: number[]) => void;
  handleProgressChange: (value: number[]) => void;
  handleQualityChange: (quality: string) => void;
  formatTime: (time: number) => string;
  onClose?: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  title,
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
  formatTime,
  onClose
}) => {
  return (
    <div 
      className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 flex flex-col justify-between transition-opacity duration-300",
        controlsVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Top Controls */}
      <div className="p-4 flex justify-between items-center">
        <div className="font-medium text-lg truncate">{title}</div>
        {onClose && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Center Play Button - Only show when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          <div className="bg-white/10 backdrop-blur-sm text-white rounded-full p-6 transition-all">
            <Play className="h-12 w-12 fill-current" />
          </div>
        </div>
      )}
      
      {/* Bottom Controls */}
      <div className="p-4 flex flex-col gap-2">
        {/* Progress bar */}
        <ProgressBar 
          currentTime={currentTime}
          duration={duration}
          handleProgressChange={handleProgressChange}
          formatTime={formatTime}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlaybackControls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              duration={duration}
              currentTime={currentTime}
              handleProgressChange={handleProgressChange}
              formatTime={formatTime}
            />
            
            <VolumeControls 
              isMuted={isMuted}
              toggleMute={toggleMute}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* Quality selector */}
            <QualitySelector 
              selectedQuality={selectedQuality}
              qualityOptions={qualityOptions}
              handleQualityChange={handleQualityChange}
            />
            
            {/* Make sure fullscreen button is visible */}
            <FullscreenControl 
              isFullscreen={isFullscreen} 
              toggleFullscreen={toggleFullscreen} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
