
import React, { useState } from "react";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ChannelCard from "@/components/home/ChannelCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  channels, 
  sportsChannels, 
  newsChannels, 
  entertainmentChannels, 
  documentaryChannels,
} from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";

const LiveTV = () => {
  const [favorites, setFavorites] = useState<string[]>(
    channels.filter(channel => channel.isFavorite).map(channel => channel.id)
  );
  const [searchQuery, setSearchQuery] = useState("");
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
  
  const updateChannelsWithFavorites = (channelList: typeof channels) => {
    return channelList.map(channel => ({
      ...channel,
      isFavorite: favorites.includes(channel.id)
    }));
  };
  
  const filterChannelsBySearch = (channelList: typeof channels) => {
    if (!searchQuery) return channelList;
    
    return channelList.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const allChannelsWithFavorites = updateChannelsWithFavorites(channels);
  const filteredSportsChannels = filterChannelsBySearch(updateChannelsWithFavorites(sportsChannels));
  const filteredNewsChannels = filterChannelsBySearch(updateChannelsWithFavorites(newsChannels));
  const filteredEntertainmentChannels = filterChannelsBySearch(updateChannelsWithFavorites(entertainmentChannels));
  const filteredDocumentaryChannels = filterChannelsBySearch(updateChannelsWithFavorites(documentaryChannels));
  const filteredAllChannels = filterChannelsBySearch(allChannelsWithFavorites);

  return (
    <MainLayout>
      <div className="py-4 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Live TV</h1>
        
        <div className="relative mb-6">
          <Search className="absolute top-2.5 left-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
            <TabsTrigger value="documentary">Documentary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="animate-slide-up">
            {filteredAllChannels.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAllChannels.map((channel) => (
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
          </TabsContent>
          
          <TabsContent value="sports" className="animate-slide-up">
            {filteredSportsChannels.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No sports channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredSportsChannels.map((channel) => (
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
          </TabsContent>
          
          <TabsContent value="news" className="animate-slide-up">
            {filteredNewsChannels.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No news channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredNewsChannels.map((channel) => (
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
          </TabsContent>
          
          <TabsContent value="entertainment" className="animate-slide-up">
            {filteredEntertainmentChannels.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No entertainment channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredEntertainmentChannels.map((channel) => (
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
          </TabsContent>
          
          <TabsContent value="documentary" className="animate-slide-up">
            {filteredDocumentaryChannels.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No documentary channels found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredDocumentaryChannels.map((channel) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LiveTV;
