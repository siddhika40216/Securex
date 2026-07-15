'use client'

import { Navbar } from '@/components/navbar'
import { GlassCard } from '@/components/glass-card'
import { DashboardStats } from '@/components/dashboard-stats'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Users, TrendingUp, Activity, AlertCircle, ArrowUp } from 'lucide-react'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

// Mock admin data
const adminStats = [
  {
    label: 'Total Users',
    value: '12,485',
    change: '+2.3% this month',
    icon: <Users size={20} className="text-primary" />,
    color: 'bg-primary/20',
  },
  {
    label: 'Avg Score',
    value: '742',
    change: '+8 points',
    icon: <TrendingUp size={20} className="text-secondary" />,
    color: 'bg-secondary/20',
  },
  {
    label: 'Applications',
    value: '3,241',
    change: '+450 pending',
    icon: <Activity size={20} className="text-green-400" />,
    color: 'bg-green-500/20',
  },
  {
    label: 'Fraud Cases',
    value: '24',
    change: '-3 from last month',
    icon: <AlertCircle size={20} className="text-yellow-400" />,
    color: 'bg-yellow-500/20',
  },
]

const scoreDistribution = [
  { range: '300-579', users: 2150, percentage: 17 },
  { range: '580-669', users: 1890, percentage: 15 },
  { range: '670-739', users: 3240, percentage: 26 },
  { range: '740-799', users: 3450, percentage: 28 },
  { range: '800+', users: 1755, percentage: 14 },
]

const applicationTrend = [
  { month: 'Jan', applications: 245, approved: 210, rejected: 35 },
  { month: 'Feb', applications: 280, approved: 245, rejected: 35 },
  { month: 'Mar', applications: 320, approved: 280, rejected: 40 },
  { month: 'Apr', applications: 350, approved: 310, rejected: 40 },
  { month: 'May', applications: 380, approved: 340, rejected: 40 },
  { month: 'Jun', applications: 420, approved: 380, rejected: 40 },
  { month: 'Jul', applications: 450, approved: 410, rejected: 40 },
]

const riskMetrics = [
  { category: 'Low Risk', value: 28, count: 3485 },
  { category: 'Medium Risk', value: 45, count: 5608 },
  { category: 'High Risk', value: 18, count: 2245 },
  { category: 'Critical', value: 9, count: 1147 },
]

const COLORS = ['#00c2ff', '#7c3aed', '#60a5fa', '#34d399']

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-background to-background/80 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-foreground/60">Platform analytics and performance metrics</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="mb-12">
            <DashboardStats stats={adminStats} />
          </div>

          {/* Main Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Application Trends */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">Application Trends</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <XAxis dataKey="month" stroke="#a0aec0" />
                      <YAxis stroke="#a0aec0" />
                      <Tooltip contentStyle={{ backgroundColor: '#141d2d', border: '1px solid #00c2ff' }} />
                      <Legend />
                      <Bar dataKey="approved" stackId="a" fill="#00c2ff" name="Approved" />
                      <Bar dataKey="rejected" stackId="a" fill="#ff4444" name="Rejected" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Risk Distribution */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">Risk Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={riskMetrics} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#00c2ff" dataKey="value">
                        {riskMetrics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#141d2d', border: '1px solid #00c2ff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Score Distribution */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mb-6">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold mb-6">Credit Score Distribution</h3>
              <div className="space-y-4">
                {scoreDistribution.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.range}</span>
                      <span className="text-sm text-foreground/60">{item.users.toLocaleString()} users ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-background/50 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Growth */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">User Growth</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <XAxis dataKey="month" stroke="#a0aec0" />
                      <YAxis stroke="#a0aec0" />
                      <Tooltip contentStyle={{ backgroundColor: '#141d2d', border: '1px solid #00c2ff' }} />
                      <Line type="monotone" dataKey="applications" stroke="#00c2ff" strokeWidth={3} dot={{ fill: '#00c2ff' }} name="Total" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Platform Stats */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">Approval Rate</span>
                    <span className="text-2xl font-bold text-primary">90.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">Avg Processing Time</span>
                    <span className="text-2xl font-bold text-secondary">2.3 mins</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">System Uptime</span>
                    <span className="text-2xl font-bold text-green-400">99.99%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">Fraud Detection Rate</span>
                    <span className="text-2xl font-bold text-blue-400">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">Average Score</span>
                    <span className="text-2xl font-bold">742</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-sm text-foreground/60">Avg Credit Utilization</span>
                    <span className="text-2xl font-bold">31%</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
