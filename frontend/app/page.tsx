'use client'

import { Navbar } from '@/components/navbar'
import { GlassCard } from '@/components/glass-card'
import { GradientButton } from '@/components/gradient-button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Zap, Lock, BarChart3, Brain } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Page() {
  const features = [
  {
    icon: Brain,
    title: 'Alternative Credit Assessment',
    description: 'Evaluate creditworthiness using bank transactions, UPI history, rent payments, and financial behaviour.',
  },
  {
    icon: Shield,
    title: 'Fraud Detection',
    description: 'Detect suspicious financial activities and reduce lending risk using AI-powered fraud analysis.',
  },
  {
    icon: TrendingUp,
    title: 'Behavioural Credit Analysis',
    description: 'Analyze income stability, spending patterns, savings habits, and repayment behaviour.',
  },
  {
    icon: Zap,
    title: 'Instant AI Decision',
    description: 'Generate a credit score, risk category, and loan recommendation within seconds.',
  },
  {
    icon: Lock,
    title: 'Explainable AI',
    description: 'Understand every credit decision through transparent SHAP-based explanations.',
  },
  {
    icon: BarChart3,
    title: 'Personalized Loan Insights',
    description: 'Recommend suitable loan limits and repayment options based on financial capacity.',
  },
]

  const workflow = [
  {
    step: '01',
    title: 'Upload Financial Data',
    description: 'Securely upload bank statements, UPI history, and employment information.',
  },
  {
    step: '02',
    title: 'AI Behaviour Analysis',
    description: 'Our AI extracts financial patterns and behavioural indicators.',
  },
  {
    step: '03',
    title: 'Risk & Fraud Evaluation',
    description: 'The system evaluates repayment risk and detects potential fraud.',
  },
  {
    step: '04',
    title: 'Credit Report',
    description: 'Receive your credit score, explainable insights, and personalized loan recommendations.',
  },
  ]
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-background to-background/80 min-h-screen pt-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Zap size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">Ethical AI • Alternative Credit Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-balance">
                AI-Powered Alternative{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Credit Assessment
                </span>
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                
              </p>SecureX evaluates creditworthiness using alternative financial signals
                  such as UPI transactions, bank statements, savings behaviour,
                  employment stability, and spending patterns.

                  Our Explainable AI helps financial institutions make fair,
                  transparent, and inclusive lending decisions.
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <GradientButton size="lg" variant="primary">
                <Link href="/assessment" className="flex items-center gap-2">
                  Start Assessment <ArrowRight size={18} />
                </Link>
              </GradientButton>
              <GradientButton size="lg" variant="outline">
                <a href="#features" className="flex items-center gap-2">
                  View AI Workflow <ArrowRight size={18} />
                </a>
              </GradientButton>
            </motion.div>
          </motion.div>

          {/* Gradient Background Elements */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Everything you need for comprehensive credit analysis and financial management
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <GlassCard className="p-6 h-full flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-foreground/60">{feature.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        {/* Workflow Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
            <p className="text-xl text-foreground/60">Simple, transparent, and secure</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {workflow.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6 space-y-4 relative">
                  <div className="text-4xl font-bold text-primary/40">{item.step}</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-foreground/60 text-sm">{item.description}</p>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 border border-primary/20 rounded-full">
                      <div className="w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0" />
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 text-center space-y-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Join thousands of institutions using SecureX for intelligent credit decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <GradientButton size="lg" variant="primary">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    Access Dashboard <ArrowRight size={18} />
                  </Link>
                </GradientButton>
                <GradientButton size="lg" variant="outline">
                  Schedule Demo
                </GradientButton>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20 py-12 bg-background/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4">SecureX</h4>
                <p className="text-foreground/60 text-sm">AI-powered credit scoring for the modern financial world</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li><a href="#" className="hover:text-primary transition">Features</a></li>
                  <li><a href="#" className="hover:text-primary transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary transition">Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li><a href="#" className="hover:text-primary transition">About</a></li>
                  <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-foreground/60">
                  <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                  <li><a href="#" className="hover:text-primary transition">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-foreground/60 text-sm">&copy; 2024 SecureX. All rights reserved.</p>
              <div className="flex gap-6 text-foreground/60 text-sm mt-4 md:mt-0">
                <a href="#" className="hover:text-primary transition">Twitter</a>
                <a href="#" className="hover:text-primary transition">LinkedIn</a>
                <a href="#" className="hover:text-primary transition">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
