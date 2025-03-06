
import React from "react";
import BottomNav from "@/components/navigation/BottomNav";
import { Link } from "react-router-dom";
import { Tv } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  fullscreen?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  fullscreen = false
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!fullscreen && (
        <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-1.5">
                <Tv className="h-5 w-5 text-background" />
              </div>
              <span className="font-bold text-xl text-gradient">StreamHub</span>
            </Link>
          </div>
        </header>
      )}
      
      <main className={`flex-1 ${fullscreen ? "" : "pb-20"}`}>
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      
      {!fullscreen && <BottomNav />}
    </div>
  );
};

export default MainLayout;
