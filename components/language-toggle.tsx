'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-4 right-4 sm:right-16 z-50 rounded-full w-12 h-12 bg-accent/80 hover:bg-accent text-accent-foreground shadow-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      {language === 'en' ? 'عربي' : 'EN'}
    </Button>
  );
}
