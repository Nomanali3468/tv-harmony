
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import CategorySection from "@/components/home/CategorySection";
import { 
  featuredItems, 
  sportsChannels, 
  liveChannels,
  favoriteChannels,
  channels,
} from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>(
    favoriteChannels.map(channel => channel.id)
  );
  const { toast } = useToast();
  
  const handleToggleFavorite = (channelId: string) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        toast({
          title: "Removed from favorites",
          description: "Channel removed from your favorites list",
        });
        return prev.filter(id => id !== channelId);
      } else {
        toast({
          title: "Added to favorites",
          description: "Channel added to your favorites list",
        });
        return [...prev, channelId];
      }
    });
  };
  
  // Update channel data with current favorite state
  const channelsWithFavorites = channels.map(channel => ({
    ...channel,
    isFavorite: favorites.includes(channel.id)
  }));
  
  const liveSportsChannels = channelsWithFavorites
    .filter(channel => channel.isLive && channel.category === "Sports")
    .slice(0, 5);
  
  const recommendedChannels = channelsWithFavorites
    .filter(channel => channel.isLive)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  
  const favoritesWithUpdatedState = channelsWithFavorites
    .filter(channel => favorites.includes(channel.id));

  return (
    <MainLayout>
      <div className="animate-fade-in py-4">
        <FeaturedCarousel items={featuredItems} />
        
        <CategorySection
          title="Live Sports"
          linkTo="/live/sports"
          channels={liveSportsChannels}
          onToggleFavorite={handleToggleFavorite}
          className="animate-slide-up"
        />
        
        {favoritesWithUpdatedState.length > 0 && (
          <CategorySection
            title="Your Favorites"
            linkTo="/favorites"
            channels={favoritesWithUpdatedState.slice(0, 5)}
            onToggleFavorite={handleToggleFavorite}
            className="animate-slide-up [animation-delay:100ms]"
          />
        )}
        
        <CategorySection
          title="Recommended For You"
          channels={recommendedChannels}
          onToggleFavorite={handleToggleFavorite}
          className="animate-slide-up [animation-delay:200ms]"
        />
      </div>
    </MainLayout>
  );
};

export default Index;
