import { auth } from '@/auth';
import { AppConfig } from '@/config/appConfig';
import { i18nRouter } from 'next-i18n-router';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import i18nConfig from '@/i18nConfig';

const protectedRoutes = ['/bookmarks'];

const ROUTES = {
  es: {
    food: '/comida',
    entertainment: '/entretenimiento',
  },
  en: {
    comida: '/food',
    entretenimiento: '/entertainment',
  },
};

export default async function middleware(request: NextRequest) {
  const languageParam = request.nextUrl.pathname.split('/')[1] as keyof typeof ROUTES;
  const categoryParam = request.nextUrl.pathname.split('/')[2] as string;
  const tailParam = request.nextUrl.pathname.split('/').slice(3).join('/');

  if (ROUTES[languageParam] && categoryParam && categoryParam in ROUTES[languageParam]) {
    const absoluteURL = new URL(
      `${request.nextUrl.origin}/${languageParam}/${
        (ROUTES[languageParam] as any)[categoryParam]
      }/${tailParam}`,
    );
    return NextResponse.redirect(absoluteURL);
  }

  const session = await auth();
  const isProtectedRoute = protectedRoutes.some((prefix) => {
    return request.nextUrl.pathname.includes(prefix);
  });

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL(AppConfig.APP_ROUTES.home.path, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  const i18nResponse = await i18nRouter(request, i18nConfig);

  if (i18nResponse) {
    return i18nResponse;
  }

  return;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
