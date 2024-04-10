import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { StylesConfig } from '@/config/stylesConfig';
import { useTranslation } from 'react-i18next';
import { UseNavigatorStyles } from '@/lib/definitions';

const useNavigatorStyles = (): UseNavigatorStyles => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const pathname = usePathname();
  const match = pathname.match(/\/(?:[^\/]+\/)([^\/]+)/);
  const cleanPath = match ? '/' + match[1] : '/';

  const getActiveUnderlineColor = useCallback((routeName: string): string => {
    return StylesConfig.ROUTE_NAME_COLOR[routeName] || 'var(--c-highlights)';
  }, []);

  const getMobileActiveStyle = useCallback(
    (routeName: string): { color: string } => {
      return cleanPath === routeName
        ? { color: getActiveUnderlineColor(routeName) }
        : { color: theme === StylesConfig.APP_THEMES.dark ? 'white' : 'black' };
    },
    [cleanPath, theme, getActiveUnderlineColor],
  );

  const getUnderLineStyles = useCallback(
    (
      formattedTitle: string,
    ): {
      content?: string;
      bottom?: string;
      left?: string;
      right?: string;
      height?: string;
      backgroundColor?: string;
      opacity?: string;
      transition?: string;
      borderRadius?: string;
    } => {
      return cleanPath === formattedTitle
        ? {
            content: "''",
            bottom: '-7px',
            left: '0',
            right: '0',
            height: '2px',
            backgroundColor: `${getActiveUnderlineColor(formattedTitle)}`,
            opacity: '0.75',
            transition: 'opacity 0.3s ease, width 0.3s ease, background-color 0.3s ease',
            borderRadius: '100%',
          }
        : {};
    },
    [cleanPath, getActiveUnderlineColor],
  );

  return {
    getActiveUnderlineColor,
    getMobileActiveStyle,
    getUnderLineStyles,
    cleanPath,
  };
};

export default useNavigatorStyles;
