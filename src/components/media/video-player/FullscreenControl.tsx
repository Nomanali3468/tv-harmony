
import React from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FullscreenControlProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenControl: React.FC<FullscreenControlProps> = ({
  isFullscreen,
  toggleFullscreen
}) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleFullscreen}
      className="text-white hover:bg-white/10"
    >
      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
    </Button>
  );
};

export default FullscreenControl;
