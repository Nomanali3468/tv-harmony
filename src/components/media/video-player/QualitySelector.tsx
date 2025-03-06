
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface QualityOption {
  label: string;
  value: string;
}

interface QualitySelectorProps {
  selectedQuality: string;
  qualityOptions: QualityOption[];
  handleQualityChange: (quality: string) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  selectedQuality,
  qualityOptions,
  handleQualityChange
}) => {
  return (
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
  );
};

export default QualitySelector;
