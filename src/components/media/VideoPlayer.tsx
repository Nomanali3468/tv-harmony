
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, X, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  onClose?: () => void;
  isFullScreen?: boolean;
}

interface QualityOption {
  label: string;
  value: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  onClose,
  isFullScreen = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(isFullScreen);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [qualityOptions, setQualityOptions] = useState<QualityOption[]>([
    { label: "Auto", value: "auto" },
    { label: "1080p", value: "1080" },
    { label: "720p", value: "720" },
    { label: "480p", value: "480" },
    { label: "360p", value: "360" },
  ]);
  const [selectedQuality, setSelectedQuality] = useState<string>("auto");
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        togglePlay();
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyF') {
        toggleFullscreen();
      } else if (e.code === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume / 100;
    }
  }, [isMuted, volume]);

  useEffect(() => {
    showControls();

    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    showControls();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showControls();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    showControls();
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    showControls();
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
    showControls();
  };

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    // In a real implementation, you would switch the video source or use adaptive streaming
    // For this demo, we'll just show a toast or console log
    console.log(`Quality changed to ${quality}`);
    showControls();
  };

  const showControls = () => {
    setControlsVisible(true);
    
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={playerRef}
      className={cn(
        "relative group text-white overflow-hidden",
        isFullscreen ? "fixed inset-0 z-50 bg-black" : "rounded-xl w-full aspect-video",
      )}
      onMouseMove={showControls}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onLoadedData={() => {
          if (isFullScreen) setIsPlaying(true);
        }}
      />
      
      {/* Video Controls */}
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
        
        {/* Center Play Button */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div 
            className={cn(
              "bg-white/10 backdrop-blur-sm text-white rounded-full p-6 transition-all",
              isPlaying ? "scale-0 opacity-0" : "scale-100 opacity-100"
            )}
          >
            <Play className="h-12 w-12 fill-current" />
          </div>
        </div>
        
        {/* Bottom Controls */}
        <div className="p-4 flex flex-col gap-2">
          {/* Progress bar */}
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay}
                className="text-white hover:bg-white/10"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
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
            </div>
            
            <div className="flex items-center gap-2">
              {/* Quality selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-white/10 gap-1 text-xs"
                  >
                    <Settings className="h-4 w-4" />
                    <span>{selectedQuality === 'auto' ? 'Auto' : `${selectedQuality}p`}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-24">
                  {qualityOptions.map((option) => (
                    <DropdownMenuItem 
                      key={option.value}
                      onClick={() => handleQualityChange(option.value)}
                      className={cn(
                        selectedQuality === option.value ? "bg-primary/20" : ""
                      )}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/10"
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
