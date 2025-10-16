import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function Button({ variant = 'secondary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return <button className={`button button-${variant} button-${size} ${className}`} {...props}>{children}</button>;
}
