import React from 'react'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-background hover:opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  }

  return (
    <button
      className={`
        font-semibold rounded-lg transition-all duration-300 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
