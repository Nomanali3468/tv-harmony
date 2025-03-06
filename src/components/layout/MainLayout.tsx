
import React from "react";
import BottomNav from "@/components/navigation/BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
  fullscreen?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  fullscreen = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
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
