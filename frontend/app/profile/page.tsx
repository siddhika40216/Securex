'use client'

import { Navbar } from '@/components/navbar'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { motion } from 'framer-motion'
import { mockUserData, mockCreditFactors } from '@/lib/mock-data'
import { Mail, MapPin, Calendar, Shield, Download, Edit2, LogOut } from 'lucide-react'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-background to-background/80 min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
            <p className="text-foreground/60">Manage your account and view your credit report</p>
          </motion.div>

          {/* Profile Info Card */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mb-6">
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{mockUserData.name}</h2>
                  <div className="space-y-2 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {mockUserData.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Account Age: {mockUserData.accountAge}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6 md:mt-0">
                  <GradientButton variant="outline" size="sm">
                    <Edit2 size={16} className="mr-2" /> Edit Profile
                  </GradientButton>
                  <GradientButton variant="outline" size="sm">
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </GradientButton>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Current Credit Score</p>
                    <p className="text-2xl font-bold text-primary">{mockUserData.creditScore}</p>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Risk Assessment</p>
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-green-400" />
                      <span className="text-lg font-semibold">{mockUserData.riskLevel}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm mb-2">Approval Rate</p>
                    <p className="text-2xl font-bold">{mockUserData.approvalRate}%</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Credit Report */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mb-6">
            <GlassCard className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Credit Report</h3>
                <GradientButton variant="outline" size="sm">
                  <Download size={16} className="mr-2" /> Download PDF
                </GradientButton>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Credit Analysis Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCreditFactors.map((factor, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">{factor.label}</span>
                          <span className="text-lg font-bold text-primary">{factor.value}%</span>
                        </div>
                        <div className="w-full bg-background/50 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${factor.value}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground/50">Weight in score: {factor.weight}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-semibold mb-4">Key Recommendations</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-sm text-green-400">Maintain your excellent payment history - this is your strongest factor</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-400">Your credit utilization is optimal at 28% - keep it below 30% for best results</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <p className="text-sm text-purple-400">Consider diversifying your credit mix with a secured credit card</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Security Settings */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="mb-6">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-foreground/60">Add an extra layer of security</p>
                  </div>
                  <GradientButton variant="outline" size="sm">Enable</GradientButton>
                </div>
                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition">
                  <div>
                    <p className="font-medium">Password Update</p>
                    <p className="text-sm text-foreground/60">Change your account password</p>
                  </div>
                  <GradientButton variant="outline" size="sm">Update</GradientButton>
                </div>
                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition">
                  <div>
                    <p className="font-medium">Login Activity</p>
                    <p className="text-sm text-foreground/60">View recent login attempts</p>
                  </div>
                  <GradientButton variant="outline" size="sm">View</GradientButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Account Settings */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants}>
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold mb-6">Account Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded bg-background border border-white/20" defaultChecked />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-foreground/60">Receive updates about your account</p>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded bg-background border border-white/20" defaultChecked />
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-foreground/60">Get notified of unusual activity</p>
                    </div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded bg-background border border-white/20" />
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-foreground/60">Receive news and product updates</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <GradientButton size="md" variant="primary">Save Preferences</GradientButton>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </>
  )
}
