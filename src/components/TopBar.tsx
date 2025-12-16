'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HelpSheet } from '@/components/HelpSheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePromptStore } from '@/store/promptStore';
import { useRouter, usePathname, useParams } from 'next/navigation';

const languages = [
  { code: 'uz', label: '🇺🇿 O\'zbek', flag: '🇺🇿' },
  { code: 'en', label: '🇬🇧 English', flag: '🇬🇧' },
  { code: 'ru', label: '🇷🇺 Русский', flag: '🇷🇺' },
  { code: 'tr', label: '🇹🇷 Türkçe', flag: '🇹🇷' },
];

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('topBar');
  const { language, setLanguage } = usePromptStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
    const currentLocale = params.locale || 'uz';
    const newPath = pathname.replace(`/${currentLocale}`, `/${lang}`);
    router.push(newPath || `/${lang}`);
  };

  const currentLanguage = languages.find((l) => l.code === language);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <HelpSheet />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={language === lang.code ? 'bg-accent' : ''}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="gap-2"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">{t('themeToggle')}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
