'use client';

import { useTranslations } from 'next-intl';
import { Type, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { usePromptStore } from '@/store/promptStore';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { VoiceInput } from './VoiceInput';

export function PromptInput() {
  const t = useTranslations('promptInput');
  const { input, setInput, clearInput, language } = usePromptStore();
  const [isImproving, setIsImproving] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleClear = () => {
    clearInput();
    toast.success(t('clear'));
  };

  const handleImprove = async () => {
    if (!input.trim()) {
      toast.error(t('improveError'));
      return;
    }

    setIsImproving(true);

    try {
      const response = await fetch('/api/improve-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          language,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || t('improveError'));
      }

      const data = await response.json();
      setInput(data.output);
      toast.success(t('improveSuccess'));
    } catch (error: any) {
      toast.error(error.message || t('improveError'));
      console.error('Improve error:', error);
    } finally {
      setIsImproving(false);
    }
  };

  const wordCount = input.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-4">
      <div className="relative group">
        {/* Gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur" />

        <div className="relative">
          <Textarea
            id="prompt-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            className="min-h-[200px] resize-none pr-14 text-base border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
          />

          <div className="absolute bottom-3 right-3">
            <VoiceInput onListeningChange={setIsVoiceListening} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {input.length > 0 && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="flex-1"
          >
            <Button
              onClick={handleImprove}
              disabled={isImproving || isVoiceListening}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              size="sm"
              title={t('improveTooltip')}
            >
              {isImproving ? (
                <>
                  {shouldReduceMotion ? (
                    <Wand2 className="mr-2 h-4 w-4" />
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                    </motion.div>
                  )}
                  {t('improving')}
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {t('improve')}
                </>
              )}
            </Button>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            <Button
              onClick={handleClear}
              disabled={isImproving || isVoiceListening}
              variant="outline"
              size="sm"
              className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('clear')}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Stats and info bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <Type className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-muted-foreground">{t('words')}:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{wordCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-muted-foreground">{t('chars')}:</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">{input.length}</span>
          </div>
        </div>

        {input.length > 0 &&
          (shouldReduceMotion ? (
            <div className="text-xs text-muted-foreground">✨ {t('ready')}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-muted-foreground"
            >
              ✨ {t('ready')}
            </motion.div>
          ))}
      </div>
    </div>
  );
}