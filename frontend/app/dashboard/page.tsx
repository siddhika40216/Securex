'use client'

import { Navbar } from '@/components/navbar'
import { GlassCard } from '@/components/glass-card'
import { CreditScoreGauge } from '@/components/credit-score-gauge'
import { DashboardStats } from '@/components/dashboard-stats'
import { GradientButton } from '@/components/gradient-button'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  mockUserData,
  mockTransactions,
  mockCreditFactors,
  mockMonthlyData,
  mockLoanRecommendations,
  mockFraudAlerts,
  mockApplications,
} from '@/lib/mock-data'
import { TrendingUp, Shield, AlertTriangle, Target, Zap, DollarSign, Activity, CheckCircle } from 'lucide-react'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-background to-background/80 min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, {mockUserData.name.split(' ')[0]}</h1>
            <p className="text-foreground/60">Here&apos;s your financial overview and personalized insights</p>
          </motion.div>

          {/* Top Stats */}
          <DashboardStats
            stats={[
              {
                label: 'Credit Score',
                value: mockUserData.creditScore,
                change: '+15 this month',
                icon: <TrendingUp size={20} className="text-primary" />,
                color: 'bg-primary/20',
              },
              {
                label: 'Risk Level',
                value: mockUserData.riskLevel,
                icon: <Shield size={20} className="text-green-400" />,
                color: 'bg-green-500/20',
              },
              {
                label: 'Applications',
                value: mockUserData.applicationsPending,
                change: 'Pending',
                icon: <Activity size={20} className="text-blue-400" />,
                color: 'bg-blue-500/20',
              },
              {
                label: 'Approval Rate',
                value: `${mockUserData.approvalRate}%`,
                change: 'Industry avg: 65%',
                icon: <CheckCircle size={20} className="text-secondary" />,
                color: 'bg-secondary/20',
              },
            ]}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {/* Credit Score Gauge */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8 flex flex-col items-center justify-center h-full">
                <CreditScoreGauge score={mockUserData.creditScore} maxScore={850} minScore={300} />
              </GlassCard>
            </motion.div>

            {/* Credit Factors */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants} className="lg:col-span-2">
              <GlassCard className="p-8 h-full">
                <h3 className="text-xl font-semibold mb-6">Credit Factors</h3>
                <div className="space-y-4">
                  {mockCreditFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{factor.label}</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          factor.impact === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                          factor.impact === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          factor.impact === 'Strong' ? 'bg-cyan-500/20 text-cyan-400' :
                          'bg-secondary/20 text-secondary'
                        }`}>
                          {factor.impact}
                        </span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${factor.value}%` }}
                        />
                      </div>
                      <div className="text-xs text-foreground/50 text-right">{factor.value}% • Weight: {factor.weight}%</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Score Trend */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mt-6">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold mb-6">Score Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockMonthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                    <XAxis dataKey="month" stroke="#a0aec0" />
                    <YAxis stroke="#a0aec0" domain={[650, 850]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#141d2d', border: '1px solid #00c2ff' }}
                      formatter={(value) => [value, 'Score']}
                    />
                    <Line type="monotone" dataKey="score" stroke="#00c2ff" strokeWidth={3} dot={{ fill: '#00c2ff' }} />
                    <Line type="monotone" dataKey="average" stroke="#7c3aed" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          {/* Transaction History and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Recent Transactions */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{tx.description}</p>
                        <p className="text-xs text-foreground/50">{tx.date}</p>
                      </div>
                      <span className={`font-semibold ${tx.amount > 0 ? 'text-green-400' : 'text-foreground'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Security Alerts */}
            <motion.div initial="hidden" animate="visible" variants={itemVariants}>
              <GlassCard className="p-8">
                <h3 className="text-xl font-semibold mb-6">Security Alerts</h3>
                <div className="space-y-4">
                  {mockFraudAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${
                      alert.severity === 'Warning'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${alert.severity === 'Warning' ? 'text-yellow-400' : 'text-blue-400'}`}>
                          <AlertTriangle size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{alert.type}</p>
                          <p className="text-xs text-foreground/60 mt-1">{alert.description}</p>
                          <p className="text-xs text-foreground/40 mt-2">{alert.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <GradientButton variant="outline" size="sm" className="w-full">
                    View All Alerts
                  </GradientButton>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Loan Recommendations */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mt-6">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold mb-6">Loan Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockLoanRecommendations.map((loan) => (
                  <GlassCard key={loan.id} className="p-6 border-primary/30 bg-primary/5">
                    <h4 className="font-semibold text-lg mb-4">{loan.type}</h4>
                    <div className="space-y-3 text-sm mb-6">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Interest Rate</span>
                        <span className="font-medium text-primary">{loan.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Amount</span>
                        <span className="font-medium">{loan.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Term</span>
                        <span className="font-medium">{loan.term}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3">
                        <span className="text-foreground/60">Monthly Payment</span>
                        <span className="font-bold">{loan.monthlyPayment}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-green-400">{loan.likelihood} Approval</span>
                    </div>
                    <GradientButton variant="primary" size="sm" className="w-full">
                      Apply Now
                    </GradientButton>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Applications */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mt-6">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold mb-6">Your Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-foreground/60">Product</th>
                      <th className="text-left py-3 text-foreground/60">Applied Date</th>
                      <th className="text-left py-3 text-foreground/60">Status</th>
                      <th className="text-left py-3 text-foreground/60">Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApplications.map((app) => (
                      <tr key={app.id} className="border-b border-white/10 hover:bg-white/5 transition">
                        <td className="py-4 font-medium">{app.type}</td>
                        <td className="py-4 text-foreground/60">{app.appliedDate}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            app.decision === 'Approved'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {app.decision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </>
  )
}
