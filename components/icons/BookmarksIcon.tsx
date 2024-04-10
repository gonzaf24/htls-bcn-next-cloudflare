import React from 'react';

interface BookmarkIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
}

const BookmarksIcon: React.FC<BookmarkIconProps> = ({
  size = 24,
  color = 'currentColor',
  isSelected = false,
}) => {
  const iconColor = isSelected ? 'white' : color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="20 -20 512 512"
      fill={iconColor}
      stroke={iconColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="112 0 112 48 416 48 416 416 464 448 464 0 112 0" fill={iconColor} />
      <polygon points="48 80 48 512 216 388 384 512 384 80 48 80" fill={iconColor} />
    </svg>
  );
};

export default BookmarksIcon;
