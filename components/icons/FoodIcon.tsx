import React from 'react';

interface FoodIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean; // Agrega la propiedad isSelected a las props
  isIndeterminate?: boolean; // Agrega la propiedad isIndeterminate
  disableAnimation?: boolean; // Agrega la propiedad disableAnimation
}

const FoodIcon: React.FC<FoodIconProps> = ({
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
      <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
    </svg>
  );
};

export default FoodIcon;
