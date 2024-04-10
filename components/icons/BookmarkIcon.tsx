import React from 'react';

interface BookmarkIconProps {
  size?: number;
  color?: string;
}

export const BookmarkIcon: React.FC<BookmarkIconProps> = ({ size = 24, color = 'currentColor' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.476 19.461l-8.451 8.501v-22.924h16.951v22.924l-8.5-8.501z"
        fill={color}
        transform="scale(1.3) translate(-4, -4)"
      ></path>
    </svg>
  );
};
