'use client';

import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { HtslLogo } from '@/components/header/HtslLogo';
import { UserMenu } from '@/components/header/UserMenu';
import { LoginButton } from '@/components/header/LoginButton';
import { useUserContext } from '@/app/context/userContext';
import Navigator from '@/components/header/Navigator';
import ThemeChanger from '@/components/header/ThemeChanger';
import OpenMenuIcon from '@/components/icons/OpenMenuIcon';
import CloseMenuIcon from '@/components/icons/CloseMenuIcon';
import LanguageChanger from '@/components/header/LanguageChanger';

export default function Header() {
  const { isAuthenticated } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const menuIcon = isMenuOpen ? <CloseMenuIcon /> : <OpenMenuIcon />;

  return (
    <Navbar maxWidth="full" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
      <NavbarContent className="gap-5" justify="start">
        <NavbarMenuToggle className="sm:hidden" icon={menuIcon} />
        <NavbarBrand className="hidden justify-end sm:flex sm:justify-start">
          <HtslLogo handleClick={handleCloseMenu} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex sm:hidden" justify="center">
        <NavbarBrand className="flex justify-end sm:hidden">
          <HtslLogo handleClick={handleCloseMenu} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex " justify="center">
        {/* Navigation menu routes */}
        <Navigator isMobile={false} onCloseMenu={handleCloseMenu} />
      </NavbarContent>

      <NavbarContent justify="end">
        {!isAuthenticated && (
          <NavbarItem className="hidden sm:flex">
            <LanguageChanger />
          </NavbarItem>
        )}

        {!isAuthenticated && (
          <NavbarItem className="hidden sm:flex">
            <ThemeChanger />
          </NavbarItem>
        )}

        <NavbarItem className="flex">
          {/* Login module */}
          {isAuthenticated ? <UserMenu /> : <LoginButton />}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="w-full gap-10 overflow-hidden pt-[100px]">
        <NavbarMenuItem className="flex flex-col items-center justify-center overflow-hidden">
          {/* Navigation mobile menu routes */}
          <Navigator isMobile={true} onCloseMenu={handleCloseMenu} />
        </NavbarMenuItem>
        {!isAuthenticated && (
          <NavbarMenuItem>
            <div className="flex items-center justify-center gap-4">
              <ThemeChanger />
              <LanguageChanger />
            </div>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
