
import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  isLive?: boolean;
  category?: string;
  isFavorite?: boolean;
  isPremium?: boolean;
}

interface CategorySectionProps {
  title: string;
  linkTo?: string;
  channels: Channel[];
  className?: string;
  onToggleFavorite?: (channelId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  linkTo,
  channels,
  className,
  onToggleFavorite,
}) => {
  return (
    <div className={cn("mt-8", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {linkTo && (
          <Link 
            to={linkTo} 
            className="text-muted-foreground hover:text-primary text-sm font-medium flex items-center"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {channels.map((channel) => (
          <ChannelCard
            key={channel.id}
            id={channel.id}
            name={channel.name}
            logoUrl={channel.logoUrl}
            isLive={channel.isLive}
            category={channel.category}
            isFavorite={channel.isFavorite}
            isPremium={channel.isPremium}
            onToggleFavorite={
              onToggleFavorite 
                ? () => onToggleFavorite(channel.id) 
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
