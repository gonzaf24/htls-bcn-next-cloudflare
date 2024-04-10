/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import Link from 'next/link';
import useNavigatorStyles from '@/app/hooks/useNavigatorStyles';
import { AppConfig } from '@/config/appConfig';
import { NavbarItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { NavigatorProps } from '@/lib/definitions';

const Navigator = ({ isMobile, onCloseMenu }: NavigatorProps) => {
  const { t } = useTranslation();
  const { getUnderLineStyles, getMobileActiveStyle } = useNavigatorStyles();

  const getFormattedTitle = (route: (typeof AppConfig.APP_ROUTES)[keyof typeof AppConfig.APP_ROUTES]) => {
    if (route.title === AppConfig.APP_ROUTES.home.title) {
      return AppConfig.APP_ROUTES.home.path;
    } else {
      return `/${t(route.title).toLowerCase()}`;
    }
  };

  const formattedPath = useMemo(() => {
    return (routeName: string) => {
      if (routeName === AppConfig.APP_ROUTES.home.title) return '/';
      return t(routeName).toLowerCase();
    };
  }, [t]);

  return (
    <>
      {isMobile && (
        <>
          {Object.values(AppConfig.APP_ROUTES).map((route, index) => (
            <Link
              key={`${route}-${index}`}
              href={`/${formattedPath(route.title)}`}
              onClick={onCloseMenu}
              className="flex w-full items-center justify-center"
            >
              <div
                style={getMobileActiveStyle(getFormattedTitle(route))}
                className="mb-5 w-full max-w-[300px] items-center justify-center border-1 border-gray-200 p-4"
              >
                <div className="flex items-center justify-center gap-4">
                  <img alt="" src={`${AppConfig.CATEGORIES_PATH}${route.icon}`} />
                  <p className="text-[1.5rem]">{t(route.title)}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      {!isMobile && (
        <>
          {Object.values(AppConfig.APP_ROUTES).map((route, index) => (
            <NavbarItem key={index}>
              <Link color={'foreground'} href={`/${formattedPath(route.title)}`} className="relative">
                {t(route.title)}
                <span
                  style={{
                    ...getUnderLineStyles(getFormattedTitle(route)),
                    position: 'absolute',
                  }}
                />
              </Link>
            </NavbarItem>
          ))}
        </>
      )}
    </>
  );
};

export default Navigator;
