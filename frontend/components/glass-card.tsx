import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 
        ${hover ? 'hover:bg-card/60 hover:border-primary/30 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
