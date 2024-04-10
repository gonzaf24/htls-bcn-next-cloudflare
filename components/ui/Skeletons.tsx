'use client';

import { useTheme } from 'next-themes';
import { StylesConfig } from '@/config/stylesConfig';

const shimmer =
  'relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200 before:to-transparent';
const shimmerDark =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent';
const shimmerLight =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-300 before:to-transparent';

export function HomeMapSkeleton() {
  const { theme } = useTheme(); // Obtener el tema actual

  const backgroundColor = theme === StylesConfig.APP_THEMES.dark ? 'bg-[#18181a]' : 'bg-gray-100';
  const shimmer = theme === StylesConfig.APP_THEMES.dark ? shimmerDark : shimmerLight;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div
          className={`${shimmer} ${backgroundColor} relative m-4 h-[96px] w-full max-w-screen-sm overflow-hidden rounded-md shadow-md sm:h-14 `}
        ></div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className={`${shimmer} ${backgroundColor} relative h-[600px] w-full overflow-hidden p-2 shadow-md sm:h-[680px] `}
        ></div>
      </div>
    </div>
  );
}

export function IconCategorySkeleton() {
  const { theme } = useTheme(); // Obtener el tema actual
  const backgroundColor = theme === StylesConfig.APP_THEMES.dark ? 'bg-[#18181a]' : 'bg-gray-100';
  const shimmer = theme === StylesConfig.APP_THEMES.dark ? shimmerDark : shimmerLight;

  return <div className={`${shimmer} ${backgroundColor} relative h-8 w-8 overflow-hidden rounded-full`} />;
}

export function CategoriesSkeleton() {
  const { theme } = useTheme(); // Obtener el tema actual
  const backgroundColor = theme === StylesConfig.APP_THEMES.dark ? 'bg-[#18181a]' : 'bg-gray-100';
  const shimmer = theme === StylesConfig.APP_THEMES.dark ? shimmerDark : shimmerLight;

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-start justify-start">
        <div
          className={`${shimmer} ${backgroundColor} relative  ml-[1em] mt-[1em] h-8 w-full max-w-[250px]`}
        ></div>
      </div>
      <div className="mx-[1em] mt-6 flex flex-wrap gap-6">
        <div
          className={`${shimmer} ${backgroundColor} min-w-11 h-[120px] w-[120px] select-none p-4 sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px] `}
        ></div>
        <div
          className={`${shimmer} ${backgroundColor} min-w-11 h-[120px] w-[120px] select-none p-4 sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px] `}
        ></div>
        <div
          className={`${shimmer} ${backgroundColor} min-w-11 h-[120px] w-[120px] select-none p-4 sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px] `}
        ></div>
        <div
          className={`${shimmer} ${backgroundColor} min-w-11 h-[120px] w-[120px] select-none p-4 sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px] `}
        ></div>
      </div>
    </div>
  );
}

export function PlaceSkeleton() {
  const { theme } = useTheme(); // Obtener el tema actual
  const backgroundColor = theme === StylesConfig.APP_THEMES.dark ? 'bg-[#18181a]' : 'bg-gray-100';
  const shimmer = theme === StylesConfig.APP_THEMES.dark ? shimmerDark : shimmerLight;

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-start justify-start">
        <div
          className={`${shimmer} ${backgroundColor} relative  ml-[1em] mt-[1em] h-8 w-full max-w-[250px]`}
        ></div>
      </div>
      <div className="mx-[1em] mt-[30px] flex flex-col ">
        <div className={`${shimmer} ${backgroundColor} relative  mt-[1em] h-12 w-full max-w-[250px]`}></div>
        <div className={`${shimmer} ${backgroundColor}  mt-[20px] h-[300px] w-full max-w-[600px] `}></div>
        <div className={`${shimmer} ${backgroundColor} mt-[20px] h-[100px] w-full max-w-[600px] `}></div>
      </div>
    </div>
  );
}
