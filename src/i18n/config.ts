import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { defaultLocale, locales, type Locale } from './locales';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});




