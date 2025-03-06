
import React from "react";
import { cn } from "@/lib/utils";
import { Heart, HeartOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ChannelCardProps {
  id: string;
  name: string;
  logoUrl: string;
  isLive?: boolean;
  category?: string;
  isFavorite?: boolean;
  isPremium?: boolean;
  onToggleFavorite?: () => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  id,
  name,
  logoUrl,
  isLive = false,
  category,
  isFavorite = false,
  isPremium = false,
  onToggleFavorite,
}) => {
  return (
    <div className="glass-card group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <Link to={`/live/${id}`}>
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img 
              src={logoUrl} 
              alt={name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          
          {isLive && (
            <div className="absolute top-2 left-2 rounded-full bg-primary/80 px-2 py-0.5 text-xs font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse-subtle"></span>
              <span>LIVE</span>
            </div>
          )}
          
          {isPremium && (
            <div className="absolute top-2 right-2 rounded-full bg-accent/80 px-2 py-0.5 text-xs font-semibold">
              PREMIUM
            </div>
          )}
        </div>
        
        <div className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold truncate">{name}</h3>
              {category && (
                <p className="text-xs text-muted-foreground">{category}</p>
              )}
            </div>
            
            {onToggleFavorite && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className="text-muted-foreground hover:text-primary h-8 w-8 -mt-1 -mr-1"
              >
                {isFavorite ? (
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                ) : (
                  <Heart className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChannelCard;
