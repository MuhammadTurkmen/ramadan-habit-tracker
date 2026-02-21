import NavLinks from "./nav-links";
import { Moon } from "lucide-react";
import UserProfile from "./user-profile";

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col lg:fixed border-l">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Moon className="w-8 h-8 text-primary" />
          <h1 className="text-xl text-primary">Ramadan Tracker</h1>
        </div>
      </div>
      <div className="p-4">
        <NavLinks />
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <UserProfile />
      </div>
    </div>
  );
}
