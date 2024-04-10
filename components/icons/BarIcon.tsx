import React from 'react';

interface BarIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean; // Vuelve a agregar la propiedad isSelected
  isIndeterminate?: boolean; // Agrega la propiedad isIndeterminate
  disableAnimation?: boolean; // Agrega la propiedad disableAnimation
}

const BarIcon: React.FC<BarIconProps> = ({
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
      <path d="M18,11V3a1,1,0,0,0-1-1H7A1,1,0,0,0,6,3v8a6.006,6.006,0,0,0,5,5.91V20H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V16.91A6.006,6.006,0,0,0,18,11ZM12,8a6.93,6.93,0,0,0-4,.2V4h8V9.066C14.967,8.888,13.781,8.445,12,8Z" />
    </svg>
  );
};

export default BarIcon;
