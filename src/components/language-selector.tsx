"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "fa", label: "دری" },
  { code: "ps", label: "پښتو" },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="w-5 h-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-40 p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition
              ${
                language === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
          >
            {lang.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
