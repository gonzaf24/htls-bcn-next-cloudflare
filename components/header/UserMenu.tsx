'use client';

import { useTranslation } from 'react-i18next';
import { useUserContext } from '@/app/context/userContext';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from '@nextui-org/react';
import Link from 'next/link';
import BookmarksIcon from '../icons/BookmarksIcon';
import ThemeChanger from './ThemeChanger';
import LanguageChanger from '@/components/header/LanguageChanger';
import { Classic } from '@theme-toggles/react';
import { useTheme } from 'next-themes';

export function UserMenu() {
  const { t } = useTranslation();
  const { user, logout } = useUserContext();
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4">
        <Dropdown placement="bottom-start" closeOnSelect={false}>
          <DropdownTrigger>
            <Button className="min-w-11 m-0 w-11 appearance-none rounded-full bg-transparent p-1">
              <Avatar isBordered src={user?.image} className="h-8 w-8 cursor-pointer" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={['profile']}
            aria-label="User Actions"
            variant="flat"
            className="p-3"
            itemClasses={{
              base: ['rounded-md', 'text-default-500', 'transition-opacity'],
            }}
          >
            <DropdownItem key="profile" className="h-14 gap-2 pb-4" showDivider>
              <p className="text-[10px] font-bold">{t('user-menu-signed-in-as')}</p>
              <p className="text-[12px] font-bold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="bookmarks" showDivider className="pb-4 pt-4">
              <div className="flex items-center justify-start gap-2">
                <BookmarksIcon size={15} />
                <Link href="/bookmarks"> {t('my-bookmarks')} </Link>
              </div>
            </DropdownItem>
            <DropdownItem  key="theme" endContent={<ThemeChanger />}>
              <div className='flex justify-center items-center gap-1'>
                <p>{t('theme')}</p>
                <Classic
                  duration={500}
                  toggled={theme !== 'light'}
                  className={'theme-switcher-icon'}
                  placeholder="" 
                  onPointerEnterCapture={undefined} 
                  onPointerLeaveCapture={undefined} 
                />
              </div>
            </DropdownItem>
            <DropdownItem showDivider key="language" endContent={<LanguageChanger />}>
              <p>{t('language')}</p>
            </DropdownItem>
            <DropdownItem key="logout" onClick={logout}>
              <p>{t('logout')}</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
