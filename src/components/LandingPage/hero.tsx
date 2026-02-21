"use client";

import { Moon, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LandingPageHero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className="absolute top-10 left-10 opacity-20">
        <Star className="w-16 h-16 text-accent" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Moon className="w-20 h-20 text-accent" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Moon className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-7xl text-primary">
              Ramadan Habit Tracker
              {/* {t("landing.title")} */}
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build meaningful habits this blessed month. Track your prayers,
            fasting, Quran reading, and more.
            {/* {t('landing.subtitle')} */}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <button
                // onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
                {/* {t('landing.getStarted')} */}
              </button>
            </Link>
            <Link href="/login">
              <button
                // onClick={() => navigate('/login')}
                className="px-8 py-4 bg-card border-2 border-primary text-primary rounded-lg hover:bg-secondary transition-all"
              >
                {/* {t('landing.signIn')} */}
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
