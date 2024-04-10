'use client';

import { setCookie } from 'cookies-next';
import { AppConfig } from '@/config/appConfig';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo } from 'react';
import { Avatar, Select, SelectItem } from '@nextui-org/react';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const currentDate = new Date();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const expirationDate = new Date();
    expirationDate.setDate(currentDate.getDate() + 30);

    // Set cookie for next-i18n-router
    setCookie('NEXT_LOCALE', newLocale, { expires: expirationDate, path: '/' });

    // Redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push(AppConfig.APP_ROUTES.home + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  const languageOptions = useMemo(() => {
    return AppConfig.LANGUAGE_OPTIONS.map((language) => (
      <SelectItem
        key={language.value}
        value={language.value}
        className="p-2 text-sm"
        startContent={<Avatar alt={language.label} className="h-3 w-3" src={language.avatar} />}
      >
        {language.label}
      </SelectItem>
    ));
  }, []);

  return (
    <Select
      variant="bordered"
      className="w-[100px]"
      onChange={handleChange}
      size="sm"
      defaultSelectedKeys={[currentLocale]}
    >
      {languageOptions}
    </Select>
  );
}
