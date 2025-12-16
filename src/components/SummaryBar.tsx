'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { usePromptStore } from '@/store/promptStore';
import { getModelConfig } from '@/config/models';
import { SlidersHorizontal } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export function SummaryBar() {
  const t = useTranslations('summary');
  const { model, temperature, maxTokens } = usePromptStore();
  const shouldReduceMotion = useReducedMotion();

  const modelLabel = getModelConfig(model)?.label || model;

  const openAdvancedSettings = () => {
    const section = document.getElementById('advanced-settings');
    section?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
    document.getElementById('advanced-settings-trigger')?.click();
  };

  return (
    <div className="rounded-xl border bg-gradient-to-r from-blue-50/60 to-purple-50/40 dark:from-blue-950/10 dark:to-purple-950/10 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground">{t('model')}:</span>
            <span className="font-semibold">{modelLabel}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground">{t('temperature')}:</span>
            <span className="font-semibold">{Number(temperature).toFixed(1)}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-muted-foreground">{t('maxTokens')}:</span>
            <span className="font-semibold">{maxTokens}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={openAdvancedSettings}
          className="gap-2"
          aria-label={t('openAdvanced')}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('edit')}
        </Button>
      </div>
    </div>
  );
}
