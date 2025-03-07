
// Mock data for development

export interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  streamUrl: string;
  description: string;
  category: string;
  isLive: boolean;
  isPremium: boolean;
  isFavorite: boolean;
}

export interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "live" | "upcoming";
  linkTo: string;
  startTime?: string;
}

export const featuredItems: FeaturedItem[] = [
  {
    id: "featured1",
    title: "UEFA Champions League Final",
    description: "Watch the biggest match in club football live as two European giants battle for glory.",
    imageUrl: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=2070&auto=format&fit=crop",
    type: "live",
    linkTo: "/live/sports1",
  },
  {
    id: "featured2",
    title: "Premier League: Arsenal vs Liverpool",
    description: "Premier League title race heats up with this crucial matchup between two of England's finest teams.",
    imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop",
    type: "upcoming",
    linkTo: "/live/sports2",
    startTime: "Today, 8:00 PM",
  },
  {
    id: "featured3",
    title: "NBA Playoffs: Game 7 Finals",
    description: "It all comes down to this. Who will be crowned NBA champions in this winner-takes-all game?",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
    type: "upcoming",
    linkTo: "/live/sports3",
    startTime: "Tomorrow, 9:30 PM",
  },
];

export const channels: Channel[] = [
  {
    id: "sports1",
    name: "Sports HD",
    logoUrl: "https://placehold.co/400x225/3498db/ffffff?text=Sports+HD",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "24/7 sports coverage from around the world",
    category: "Sports",
    isLive: true,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: "sports2",
    name: "Premier Sports",
    logoUrl: "https://placehold.co/400x225/e74c3c/ffffff?text=Premier+Sports",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Premium football coverage",
    category: "Sports",
    isLive: true,
    isPremium: true,
    isFavorite: false,
  },
  {
    id: "sports3",
    name: "Champions League",
    logoUrl: "https://placehold.co/400x225/f39c12/ffffff?text=Champions+League",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "UEFA Champions League matches and highlights",
    category: "Sports",
    isLive: false,
    isPremium: true,
    isFavorite: true,
  },
  {
    id: "sports4",
    name: "Cricket TV",
    logoUrl: "https://placehold.co/400x225/27ae60/ffffff?text=Cricket+TV",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "All cricket, all the time",
    category: "Sports",
    isLive: true,
    isPremium: false,
    isFavorite: false,
  },
  {
    id: "sports5",
    name: "Tennis Channel",
    logoUrl: "https://placehold.co/400x225/8e44ad/ffffff?text=Tennis+Channel",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Grand Slam tournaments and more",
    category: "Sports",
    isLive: false,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: "news1",
    name: "World News",
    logoUrl: "https://placehold.co/400x225/2c3e50/ffffff?text=World+News",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Breaking news from around the globe",
    category: "News",
    isLive: true,
    isPremium: false,
    isFavorite: false,
  },
  {
    id: "news2",
    name: "Business News",
    logoUrl: "https://placehold.co/400x225/1abc9c/ffffff?text=Business+News",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Financial markets and business insights",
    category: "News",
    isLive: true,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: "ent1",
    name: "Movies Hub",
    logoUrl: "https://placehold.co/400x225/c0392b/ffffff?text=Movies+Hub",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Blockbuster movies around the clock",
    category: "Entertainment",
    isLive: true,
    isPremium: true,
    isFavorite: true,
  },
  {
    id: "ent2",
    name: "Drama Plus",
    logoUrl: "https://placehold.co/400x225/16a085/ffffff?text=Drama+Plus",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Best drama series and shows",
    category: "Entertainment",
    isLive: false,
    isPremium: true,
    isFavorite: false,
  },
  {
    id: "doc1",
    name: "Discovery",
    logoUrl: "https://placehold.co/400x225/2980b9/ffffff?text=Discovery",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Documentaries that inspire and educate",
    category: "Documentary",
    isLive: true,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: "custom1",
    name: "Custom Channel",
    logoUrl: "https://placehold.co/400x225/9b59b6/ffffff?text=Custom+Channel",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    description: "Your custom channel with unique content",
    category: "Entertainment",
    isLive: true,
    isPremium: false,
    isFavorite: true,
  },
];

export const sportsChannels = channels.filter(channel => channel.category === "Sports");
export const newsChannels = channels.filter(channel => channel.category === "News");
export const entertainmentChannels = channels.filter(channel => channel.category === "Entertainment");
export const documentaryChannels = channels.filter(channel => channel.category === "Documentary");
export const favoriteChannels = channels.filter(channel => channel.isFavorite);
export const liveChannels = channels.filter(channel => channel.isLive);
