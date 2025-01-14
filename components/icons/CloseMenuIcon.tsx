import React from 'react';

interface CloseMenuIconProps {
  size?: number;
  color?: string;
  isSelected?: boolean;
  isIndeterminate?: boolean;
  disableAnimation?: boolean;
}

const CloseMenuIcon: React.FC<CloseMenuIconProps> = ({
  size = 24,
  color = 'currentColor',
  isSelected = false,
  isIndeterminate = false,
  disableAnimation = false,
  ...props
}) => {
  const iconColor = isSelected ? 'white' : color;

  return (
    <svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g id="Lager_20" data-name="Lager 20" transform="translate(-6 -6)">
        <path
          id="Path_23"
          data-name="Path 23"
          d="M18.695,16l6.752-6.752a1.886,1.886,0,0,0,0-2.668l-.027-.027a1.886,1.886,0,0,0-2.668,0L16,13.305,9.248,6.553a1.886,1.886,0,0,0-2.668,0l-.027.027a1.886,1.886,0,0,0,0,2.668L13.305,16,6.553,22.752a1.886,1.886,0,0,0,0,2.668l.027.027a1.886,1.886,0,0,0,2.668,0L16,18.695l6.752,6.752a1.886,1.886,0,0,0,2.668,0l.027-.027a1.886,1.886,0,0,0,0-2.668Z"
          fill={iconColor}
        />
      </g>
    </svg>
  );
};

export default CloseMenuIcon;
