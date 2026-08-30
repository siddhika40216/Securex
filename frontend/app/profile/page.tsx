'use client'

import { Navbar } from '@/components/navbar'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
const [creditResult, setCreditResult] = useState<any>(null)

useEffect(() => {
  const savedResult = localStorage.getItem("creditResult")

  if (savedResult) {
    setCreditResult(JSON.parse(savedResult))
  }
}, [])
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


        <GlassCard className="p-8">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">

    <div>
      <h2 className="text-3xl font-bold mb-2">
        Credit Assessment Profile
      </h2>

      <p className="text-sm text-foreground/60">
        Your latest AI-powered credit assessment
      </p>
    </div>

  </div>

  <div className="border-t border-white/10 pt-6">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div>
        <p className="text-foreground/60 text-sm mb-2">
          Current Credit Score
        </p>

        <p className="text-2xl font-bold text-primary">
          {creditResult?.score ?? "Not available"}
        </p>
      </div>

      <div>
        <p className="text-foreground/60 text-sm mb-2">
          Risk Assessment
        </p>

        <div className="flex items-center gap-2">
          <Shield size={20} className="text-green-400" />

          <span className="text-lg font-semibold">
            {creditResult?.risk ?? "Not available"}
          </span>
        </div>
      </div>

      <div>
        <p className="text-foreground/60 text-sm mb-2">
          Model Confidence
        </p>

        <p className="text-2xl font-bold">
          {creditResult
            ? `${creditResult.confidence}%`
            : "Not available"}
        </p>
      </div>

    </div>
  </div>
</GlassCard>
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
                    {creditResult?.feature_importance?.map(
                      (factor: any, index: number) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex justify-between items-center mb-3">

                            <span className="font-medium">
                              {factor.feature}
                            </span>

                            <span className="text-lg font-bold text-primary">
                              {(factor.importance * 100).toFixed(2)}%
                            </span>

                          </div>

                          <div className="w-full bg-background/50 rounded-full h-2 mb-2">

                            <div
                              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  factor.importance * 100,
                                  100
                                )}%`,
                              }}
                            />

      </div>

      <p className="text-xs text-foreground/50">
        Model feature importance
      </p>

    </div>
  )
)}
                  </div>
                </div>

              <div className="border-t border-white/10 pt-6">
  <h4 className="font-semibold mb-4">
    AI Credit Analysis
  </h4>

  <div className="space-y-3">
    {creditResult?.shap_explanation
      ?.slice(0, 5)
      .map((item: any, index: number) => (
        <div
          key={index}
          className={`p-4 rounded-lg border ${
            item.impact >= 0
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <p
            className={`text-sm ${
              item.impact >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            <strong>{item.feature}</strong>{" "}
            {item.impact >= 0
              ? "has a positive impact on the prediction."
              : "has a negative impact on the prediction."}
          </p>
        </div>
      ))}
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
