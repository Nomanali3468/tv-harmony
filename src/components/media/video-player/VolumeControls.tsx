
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VolumeControlsProps {
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  handleVolumeChange: (value: number[]) => void;
}

const VolumeControls: React.FC<VolumeControlsProps> = ({
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange
}) => {
  return (
    <div className="flex items-center gap-2 w-32">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMute}
        className="text-white hover:bg-white/10"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
        className="w-20"
      />
    </div>
  );
};

export default VolumeControls;
