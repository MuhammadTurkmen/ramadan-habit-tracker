"use client";

import { Menu, Moon, X } from "lucide-react";
import NavLinks from "./nav-links";
import ThemeToggle from "../theme-toggle";
import { useState } from "react";
import LanguageToggle from "../language-selector";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/language-context";
import UserProfileMenu from "./user-profile-menu";

export default function MobileHeader({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Moon className="w-6 h-6 text-primary" />
          <span className="text-lg text-primary">Ramadan Tracker</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <LanguageToggle />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed top-18.25 inset-0 bg-black/40 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`${
                isRTL ? "right-0" : "left-0"
              } lg:hidden fixed top-18.25 right-0 bottom-0 w-64 bg-card border-r border-border z-40 overflow-y-auto flex flex-col`}
            >
              <div className="flex-1 space-y-2 p-4">
                <NavLinks onClick={() => setIsOpen(false)} />
              </div>

              <div className="p-4 border-t border-border space-y-2">
                <div className="flex items-center gap-2 px-4 py-2">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">
                    Toggle Theme
                  </span>
                </div>
                <UserProfileMenu
                  name={user.user_metadata?.full_name ?? "User"}
                  email={user.email ?? ""}
                  avatar={user.user_metadata?.avatar_url ?? "/avatarr.png"}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
