
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChannelCard from "@/components/home/ChannelCard";
import { channels } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>(
    channels.filter(channel => channel.isFavorite).map(channel => channel.id)
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
  
  const favoriteChannels = channels
    .filter(channel => favorites.includes(channel.id))
    .map(channel => ({
      ...channel,
      isFavorite: true
    }));

  return (
    <MainLayout>
      <div className="py-4 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        
        {favoriteChannels.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-4">
              You haven't added any channels to your favorites list yet.
            </p>
            <p>
              Browse channels and click the heart icon to add them to your favorites.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                id={channel.id}
                name={channel.name}
                logoUrl={channel.logoUrl}
                isLive={channel.isLive}
                category={channel.category}
                isFavorite={channel.isFavorite}
                isPremium={channel.isPremium}
                onToggleFavorite={() => handleToggleFavorite(channel.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Favorites;
