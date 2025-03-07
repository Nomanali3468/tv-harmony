
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface PlaybackControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  duration: number;
  currentTime: number;
  handleProgressChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  isPlaying,
  togglePlay,
  duration,
  currentTime,
  handleProgressChange,
  formatTime
}) => {
  const handleCenterPlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    togglePlay();
  };

  return (
    <>
      {/* Center Play Button - Only show when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handleCenterPlayClick}
        >
          <div className="bg-white/10 backdrop-blur-sm text-white rounded-full p-6 transition-all">
            <Play className="h-12 w-12 fill-current" />
          </div>
        </div>
      )}
      
      {/* Bottom Playback Controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            togglePlay();
          }}
          className="text-white hover:bg-white/10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>
    </>
  );
};

export default PlaybackControls;
