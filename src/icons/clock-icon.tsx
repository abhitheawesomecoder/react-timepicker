import * as React from "react";

export interface ClockIconProps extends React.SVGProps<SVGSVGElement> {}

export const ClockIcon = ({
  width = 24,
  height = 24,
  ...props
}: ClockIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.4889971 2 2 6.4889971 2 12C2 17.511003 6.4889971 22 12 22C17.511003 22 22 17.511003 22 12C22 6.4889971 17.511003 2 12 2ZM12 4C16.430123 4 20 7.5698774 20 12C20 16.430123 16.430123 20 12 20C7.5698774 20 4 16.430123 4 12C4 7.5698774 7.5698774 4 12 4ZM11 6L11 12.414062L15.292969 16.707031L16.707031 15.292969L13 11.585938L13 6L11 6Z" />
    </svg>
  );
};
