'use client';

import { useTranslations } from 'next-intl';
import { Copy, Check, TestTube, Sparkles, FileText, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { usePromptStore } from '@/store/promptStore';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { copyToClipboard } from '@/lib/clipboard';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function OutputCard() {
  const t = useTranslations('output');
  const tCommon = useTranslations('common');
  const { output, model, temperature, maxTokens } = usePromptStore();
  const [copied, setCopied] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = async () => {
    try {
      await copyToClipboard(output);
      setCopied(true);
      toast.success(t('copySuccess'));
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error(t('copyError'));
    }
  };

  if (!output) return null;

  const wordCount = output.trim().split(/\s+/).length;
  const charCount = output.length;

  const handleTest = async () => {
    if (!testInput.trim()) {
      toast.error(t('testInputRequired'));
      return;
    }

    setIsTesting(true);
    setTestOutput('');
    try {
      const response = await fetch('/api/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: output,
          input: testInput,
          model,
          temperature,
          maxTokens: Math.min(maxTokens, 512),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || tCommon('error'));
      setTestOutput(data.output || '');
    } catch (error: any) {
      toast.error(error.message || tCommon('error'));
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      {/* Gradient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-20 animate-pulse motion-reduce:animate-none" />

      <Card className="relative border-2 border-blue-500/20 shadow-2xl overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

        <CardHeader className="pb-4 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={shouldReduceMotion ? false : { rotate: 0 }}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('title')}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {shouldReduceMotion ? (
                <Button
                  variant={copied ? "default" : "outline"}
                  size="sm"
                  onClick={handleCopy}
                  className={copied ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" : "hover:border-blue-400 hover:text-blue-600"}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t('copied')}!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      {t('copy')}
                    </>
                  )}
                </Button>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={copied ? 'check' : 'copy'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant={copied ? "default" : "outline"}
                      size="sm"
                      onClick={handleCopy}
                      className={copied ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" : "hover:border-blue-400 hover:text-blue-600"}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {t('copied')}!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          {t('copy')}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:border-purple-400 hover:text-purple-600"
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    {t('test')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{t('testSheetTitle')}</SheetTitle>
                    <SheetDescription>{t('testSheetDescription')}</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="testInput" className="text-sm font-semibold">
                        {t('testInputLabel')}
                      </label>
                      <Textarea
                        id="testInput"
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        placeholder={t('testInputPlaceholder')}
                        className="min-h-[140px]"
                      />
                    </div>

                    <Button onClick={handleTest} disabled={isTesting} className="w-full">
                      {isTesting ? t('testing') : t('testRun')}
                    </Button>

                    {testOutput && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{t('testResult')}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              try {
                                await copyToClipboard(testOutput);
                                toast.success(t('copySuccess'));
                              } catch {
                                toast.error(t('copyError'));
                              }
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            {t('copy')}
                          </Button>
                        </div>
                        <pre className="whitespace-pre-wrap break-words rounded-lg border bg-muted/30 p-4 text-sm">
                          {testOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-muted-foreground">{t('words')}:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{wordCount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Hash className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-muted-foreground">{t('characters')}:</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">{charCount}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative group">
            {/* Content container with gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur" />

            <div className="relative rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 overflow-x-auto border border-gray-200 dark:border-gray-700">
              {shouldReduceMotion ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 m-0">
                    {output}
                  </pre>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="prose prose-sm max-w-none dark:prose-invert"
                >
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 m-0">
                    {output}
                  </pre>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom info */}
          {shouldReduceMotion ? (
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/50">
              <p className="text-xs text-center text-muted-foreground">💡 {t('tip')}</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/50 dark:border-blue-800/50"
            >
              <p className="text-xs text-center text-muted-foreground">
                💡 {t('tip')}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
