import './global.css';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import { auth } from '@/auth';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers/providers';
import { AppConfig } from '@/config/appConfig';
import { UserProvider } from '@/app/context/userContext';
import { BookmarksProvider } from '@/app/context/bookmarksContext';
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import favicon from '@/public/favicon.png';
import i18nConfig from '@/i18nConfig';
import initTranslations from '@/app/[locale]/i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Highlights Barcelona',
  description: 'The best of Barcelona in one place',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const session = await auth();
  const { resources } = await initTranslations(params.locale, AppConfig.i18nNamespaces);

  return (
    <html lang={params.locale} dir={dir(params.locale)} className="dark">
      <head>
        <link rel="shortcut icon" href={favicon.src} />
      </head>
      <body className={inter.className}>
        <Providers session={session} locale={params.locale} resources={resources}>
          <UserProvider locale={params.locale}>
            <BookmarksProvider locale={params.locale}>
              <Header />
              {children}
            </BookmarksProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
