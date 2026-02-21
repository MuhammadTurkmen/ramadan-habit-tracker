"use client";

import { LogOut, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { logout } from "@/app/actions/authentication";
import { useState } from "react";

type Props = {
  name: string;
  email: string;
  avatar: string;
};

export default function UserProfileMenu({ name, email, avatar }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary w-full">
          <Avatar>
            <AvatarImage src={avatar} alt="User" width={35} height={35} />
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {email}
            </p>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-56 p-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 pb-0">
            <Avatar>
              <AvatarImage src={avatar} alt="User" width={35} height={35} />
            </Avatar>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {email}
              </p>
            </div>
          </div>

          <div className="border-t p-2 space-y-2">
            <Link href="/dashboard/settings">
              <Button
                variant="ghost"
                className="w-full mb-2 justify-start gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>

            <Button
              variant="destructive"
              className="w-full justify-start gap-2"
              onClick={async () => {
                setLoading(true);
                await logout();
                setLoading(false);
              }}
              disabled={loading}
            >
              <LogOut className="w-4 h-4" />
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
