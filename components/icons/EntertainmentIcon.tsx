import React from 'react';

interface EntertainmentIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean; // Agrega la propiedad isSelected a las props
  isIndeterminate?: boolean; // Agrega la propiedad isIndeterminate
  disableAnimation?: boolean; // Agrega la propiedad disableAnimation
}

const EntertainmentIcon: React.FC<EntertainmentIconProps> = ({
  size = 24,
  color = 'currentColor',
  isSelected = false, // Establece un valor por defecto para isSelected
  isIndeterminate = false, // Establece un valor por defecto para isIndeterminate
  disableAnimation = false, // Establece un valor por defecto para disableAnimation
  ...props
}) => {
  // Define el color del icono basado en su estado de selección
  const iconColor = isSelected ? 'white' : color;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      stroke={iconColor} // Usa el color del icono basado en el estado de selección
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 8l4 -4" />
      <path d="M14 4l-10 10" />
      <path d="M4 20l16 -16" />
      <path d="M20 10l-10 10" />
      <path d="M20 16l-4 4" />
    </svg>
  );
};

export default EntertainmentIcon;
