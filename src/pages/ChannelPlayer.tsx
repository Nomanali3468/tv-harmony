
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, X } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import VideoPlayer from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/button";
import { channels } from "@/data/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface ChatMessage {
  id: string;
  author: string;
  avatarUrl: string;
  message: string;
  timestamp: Date;
}

const ChannelPlayer = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(channels.find(c => c.id === channelId));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!channel) {
      toast({
        title: "Channel not found",
        description: "The channel you are looking for does not exist.",
        variant: "destructive",
      });
      navigate("/live");
    }
  }, [channel, navigate]);

  useEffect(() => {
    // Generate some fake chat messages
    const initialMessages: ChatMessage[] = [
      {
        id: "1",
        author: "Sarah Johnson",
        avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
        message: "Amazing game so far! Can't believe that save!",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: "2",
        author: "Michael Chen",
        avatarUrl: "https://randomuser.me/api/portraits/men/51.jpg",
        message: "The referee made a terrible call there",
        timestamp: new Date(Date.now() - 1000 * 60),
      },
      {
        id: "3",
        author: "Jasmine Williams",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        message: "Who else is watching from London? 🇬🇧",
        timestamp: new Date(Date.now() - 1000 * 30),
      },
    ];
    
    setChatMessages(initialMessages);
    
    // Add a new fake message every 20 seconds
    const interval = setInterval(() => {
      const randomMessages = [
        "This is such a great match!",
        "Can't believe they missed that shot!",
        "The commentary is on point today",
        "Anyone else having buffering issues?",
        "This is going to be a classic game",
      ];
      
      const randomNames = [
        "James Wilson",
        "Emma Thompson",
        "David Garcia",
        "Sophia Ahmed",
        "Robert Kim",
      ];
      
      const randomAvatars = [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/67.jpg",
        "https://randomuser.me/api/portraits/women/59.jpg",
        "https://randomuser.me/api/portraits/men/22.jpg",
      ];
      
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          author: randomNames[randomIndex],
          avatarUrl: randomAvatars[randomIndex],
          message: randomMessages[randomIndex],
          timestamp: new Date(),
        },
      ]);
    }, 20000);
    
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      author: "You",
      avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      message: chatMessage.trim(),
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!channel) return null;

  return (
    <MainLayout fullscreen={isFullScreen}>
      <div className={`relative ${isFullScreen ? "fixed inset-0 z-50" : "pt-4 pb-6"}`}>
        {!isFullScreen && (
          <div className="mb-4 flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-2 text-xl font-bold">{channel.name}</h1>
          </div>
        )}
        
        <div className={`flex ${isFullScreen ? "h-full" : "flex-col md:flex-row gap-4"}`}>
          <div className={`${isFullScreen ? "w-full h-full" : "w-full md:w-3/4"}`}>
            <VideoPlayer
              src={channel.streamUrl}
              title={channel.name}
              poster={channel.logoUrl}
              isFullScreen={isFullScreen}
              onClose={isFullScreen ? handleToggleFullScreen : undefined}
            />
            
            {!isFullScreen && (
              <div className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{channel.name}</h2>
                    <p className="text-muted-foreground">{channel.category}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleToggleChat}
                    className="gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {showChat ? "Hide Chat" : "Show Chat"}
                  </Button>
                </div>
                
                <p className="mt-4">{channel.description}</p>
                
                {channel.isPremium && (
                  <div className="mt-4 glass-card p-4 border-accent/20">
                    <p className="font-semibold text-accent">Premium Content</p>
                    <p className="text-sm mt-1">
                      This is premium content. Your subscription provides access to this channel.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {showChat && !isFullScreen && (
            <div className="glass-card w-full md:w-1/4 flex flex-col">
              <div className="p-3 flex justify-between items-center border-b border-white/10">
                <h3 className="font-medium">Live Chat</h3>
                <Button variant="ghost" size="icon" onClick={handleToggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="flex-1 p-3">
                <div className="flex flex-col gap-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-2">
                      <Avatar>
                        <img src={msg.avatarUrl} alt={msg.author} className="h-8 w-8 rounded-full" />
                      </Avatar>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-sm">{msg.author}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="text-sm mt-0.5">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">Send</Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ChannelPlayer;
