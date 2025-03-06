
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: "live" | "upcoming";
  linkTo: string;
  startTime?: string;
}

interface FeaturedCarouselProps {
  items: CarouselItem[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="relative rounded-3xl overflow-hidden w-full aspect-[16/9] md:aspect-[21/9]">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-fade-in"
          style={{ 
            backgroundImage: `url(${currentItem.imageUrl})`,
            transition: "opacity 0.5s ease",
            opacity: isAnimating ? 0.7 : 1
          }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        <div 
          className={cn(
            "transition-all duration-500",
            isAnimating 
              ? "opacity-0 transform translate-y-4" 
              : "opacity-100 transform translate-y-0"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              {currentItem.type === "live" ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse-subtle"></span>
                  <span>Live Now</span>
                </>
              ) : (
                <>
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Upcoming</span>
                </>
              )}
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
            {currentItem.title}
          </h2>
          
          <p className="text-sm md:text-base text-white/80 max-w-lg mb-4">
            {currentItem.description}
          </p>
          
          <div className="flex items-center gap-4">
            {currentItem.type === "live" ? (
              <Button asChild size="lg" className="gap-2">
                <Link to={currentItem.linkTo}>
                  <Play className="h-4 w-4 fill-current" /> Watch Now
                </Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="lg" className="gap-2 text-white border-white/20 bg-white/10 hover:bg-white/20">
                <Link to={currentItem.linkTo}>
                  <Calendar className="h-4 w-4" /> {currentItem.startTime}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handlePrev}
          className="ml-2 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 z-30 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleNext}
          className="mr-2 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-0 right-0 left-0 z-30 flex justify-center gap-1 mb-4">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "w-6 bg-primary" 
                : "w-1.5 bg-white/30"
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
