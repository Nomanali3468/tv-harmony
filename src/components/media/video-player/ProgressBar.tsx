
import React from 'react';
import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  handleProgressChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  handleProgressChange,
  formatTime
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">{formatTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={1}
        onValueChange={handleProgressChange}
        className="flex-1"
      />
      <span className="text-xs">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
