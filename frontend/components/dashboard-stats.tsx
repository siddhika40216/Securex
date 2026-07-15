'use client'

import { GlassCard } from './glass-card'
import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface DashboardStatsProps {
  stats: Array<{
    label: string
    value: string | number
    change?: string
    icon?: React.ReactNode
    color?: string
  }>
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <GlassCard className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <p className="text-sm text-foreground/60">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change && (
                  <p className="text-xs text-primary flex items-center gap-1">
                    <TrendingUp size={14} /> {stat.change}
                  </p>
                )}
              </div>
              {stat.icon && (
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color || 'bg-primary/20'}`}>
                  {stat.icon}
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  )
}
