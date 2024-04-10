'use client';

import { AppConfig } from '@/config/appConfig';
import { useRouter } from 'next/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { createInstance } from 'i18next';
import { SessionProvider } from 'next-auth/react';
import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import initTranslations from '@/app/[locale]/i18n';

export function Providers({
  children,
  session,
  locale,
  resources,
}: {
  children: React.ReactNode;
  session: any;
  locale: string;
  resources: any;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const i18n = createInstance();
  initTranslations(locale, AppConfig.i18nNamespaces, i18n, resources);

  useEffect(() => setMounted(true), []);

  return (
    mounted && (
      <SessionProvider session={session}>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    )
  );
}
