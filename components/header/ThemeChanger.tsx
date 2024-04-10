import { useEffect, useMemo, useState } from 'react';
import { Classic } from '@theme-toggles/react';
import { useTheme } from 'next-themes';
import { useUserContext } from '@/app/context/userContext';
import { Select, SelectItem } from '@nextui-org/react';
import { StylesConfig } from '@/config/stylesConfig';

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useUserContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  const toggleDarkMode = () => {
    setTheme(
      theme === StylesConfig.APP_THEMES.light ? StylesConfig.APP_THEMES.dark : StylesConfig.APP_THEMES.light,
    );
  };

  const themeOptions = useMemo(() => {
    return Object.entries(StylesConfig.APP_THEMES).map(([themeKey, themeValue]) => (
      <SelectItem key={themeKey} value={themeValue} className="p-2 text-sm">
        {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
      </SelectItem>
    ));
  }, []);

  if (!mounted) return null;

  return (
    <>
      {isAuthenticated && (
        <Select
          className="z-10 w-[100px]"
          variant="bordered"
          onChange={handleChange}
          defaultSelectedKeys={[theme as string]}
          size="sm"
        >
          {themeOptions}
        </Select>
      )}
      {!isAuthenticated && (
        <Classic
          duration={500}
          toggled={theme !== 'light'}
          toggle={toggleDarkMode}
          className={'theme-switcher-icon'}
          placeholder=""
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined} 
        />
      )}
    </>
  );
}
