
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  Bell,
  Shield,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  subscription: {
    plan: "Premium",
    status: "Active",
    expiryDate: "2023-12-31",
  },
};

const ProfileMenuItem = ({ 
  icon: Icon, 
  label, 
  onClick,
  endContent,
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick?: () => void;
  endContent?: React.ReactNode;
}) => {
  return (
    <button
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <span>{label}</span>
      </div>
      {endContent || <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
};

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock login for demo purposes
  const handleMockLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Welcome back!",
      description: "You have been logged in successfully.",
    });
  };
  
  const handleMockLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  return (
    <MainLayout>
      <div className="py-4 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {isLoggedIn ? (
          <div className="space-y-6">
            <div className="glass-card p-6 flex flex-col items-center md:flex-row md:items-start text-center md:text-left">
              <div className="glass-panel rounded-full p-1 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={mockUser.avatar} 
                  alt={mockUser.name} 
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">{mockUser.name}</h2>
                <p className="text-muted-foreground mb-3">{mockUser.email}</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <span className="text-sm font-medium text-primary">
                    {mockUser.subscription.plan} - Expires {mockUser.subscription.expiryDate}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden">
              <ProfileMenuItem 
                icon={User} 
                label="Account Settings" 
                onClick={() => toast({
                  title: "Account Settings",
                  description: "This feature is not implemented in the demo.",
                })}
              />
              <Separator className="bg-white/10" />
              
              <ProfileMenuItem 
                icon={CreditCard} 
                label="Subscription" 
                onClick={() => toast({
                  title: "Subscription",
                  description: "This feature is not implemented in the demo.",
                })}
              />
              <Separator className="bg-white/10" />
              
              <ProfileMenuItem 
                icon={Bell} 
                label="Notifications" 
                endContent={
                  <Switch 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                }
              />
              <Separator className="bg-white/10" />
              
              <ProfileMenuItem 
                icon={Shield} 
                label="Privacy & Security" 
                onClick={() => toast({
                  title: "Privacy & Security",
                  description: "This feature is not implemented in the demo.",
                })}
              />
              <Separator className="bg-white/10" />
              
              <ProfileMenuItem 
                icon={HelpCircle} 
                label="Help & Support" 
                onClick={() => toast({
                  title: "Help & Support",
                  description: "This feature is not implemented in the demo.",
                })}
              />
              <Separator className="bg-white/10" />
              
              <ProfileMenuItem 
                icon={LogOut} 
                label="Logout" 
                onClick={handleMockLogout}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <AuthForm />
            
            {/* For demo purposes only */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground mb-3">For demo purposes:</p>
              <Button onClick={handleMockLogin}>Mock Login</Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
