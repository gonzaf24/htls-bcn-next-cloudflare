import React from 'react';

interface MapIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
  isIndeterminate?: boolean;
  disableAnimation?: boolean;
}

const MapIcon: React.FC<MapIconProps> = ({
  size = 24,
  color = 'currentColor',
  isSelected = false,
  isIndeterminate = false,
  disableAnimation = false,
  ...props
}) => {
  // Define el color del icono basado en su estado de selección
  const iconColor = isSelected ? 'white' : color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z" />
    </svg>
  );
};

export default MapIcon;
