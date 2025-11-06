import type { IconProps } from "./types";

const CrossIcon: React.FC<IconProps> = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2px"
        fill="none"
      />
      <path d="M16 8L8 16M16 16L8 8Z" stroke="currentColor" strokeWidth="2px" />
    </svg>
  );
};

export default CrossIcon;
