
import React from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Home, Tv, Heart, User } from "lucide-react";

const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  isActive 
}: { 
  icon: React.ElementType; 
  label: string; 
  to: string; 
  isActive: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300",
        "hover:text-primary",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground"
      )}
    >
      <Icon className={cn(
        "h-6 w-6 mb-1 transition-all",
        isActive ? "scale-110" : "scale-100"
      )} />
      <span className={cn(
        "text-xs font-medium transition-all",
        isActive ? "opacity-100" : "opacity-80"
      )}>
        {label}
      </span>
    </Link>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel">
      <div className="px-3 py-2 mx-auto max-w-lg">
        <div className="flex items-center justify-around">
          <NavItem 
            icon={Home} 
            label="Home" 
            to="/" 
            isActive={pathname === "/"} 
          />
          <NavItem 
            icon={Tv} 
            label="Live TV" 
            to="/live" 
            isActive={pathname === "/live"} 
          />
          <NavItem 
            icon={Heart} 
            label="My List" 
            to="/favorites" 
            isActive={pathname === "/favorites"} 
          />
          <NavItem 
            icon={User} 
            label="Profile" 
            to="/profile" 
            isActive={pathname === "/profile"} 
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
