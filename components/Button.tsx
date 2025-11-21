import React from 'react';
import { ThemeColor } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  color?: ThemeColor;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  color = 'indigo',
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center px-6 py-3 border border-transparent 
    text-base font-medium rounded-md shadow-sm transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const colorStyles: { [key in ThemeColor]: string } = {
    indigo: `bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`,
    purple: `bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500`,
    emerald: `bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500`,
    rose: `bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500`,
    blue: `bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`, // Added blue color
  };

  const spinner = (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      className={`${baseStyles} ${colorStyles[color]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && spinner}
      {children}
    </button>
  );
};

export default Button;