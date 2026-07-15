'use client'

import { useEffect, useRef } from 'react'

interface CreditScoreGaugeProps {
  score: number
  maxScore: number
  minScore: number
}

export function CreditScoreGauge({ score, maxScore, minScore }: CreditScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 80

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI)
    ctx.strokeStyle = '#2d3748'
    ctx.lineWidth = 8
    ctx.stroke()

    // Draw colored segments
    const segments = [
      { max: 579, color: '#ff4444' },
      { max: 669, color: '#fbbf24' },
      { max: 739, color: '#34d399' },
      { max: 799, color: '#60a5fa' },
      { max: 850, color: '#00c2ff' },
    ]

    segments.forEach((segment, i) => {
      const segmentStart = Math.PI + (i * Math.PI) / segments.length
      const segmentEnd = Math.PI + ((i + 1) * Math.PI) / segments.length

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, segmentStart, segmentEnd)
      ctx.strokeStyle = segment.color
      ctx.lineWidth = 8
      ctx.stroke()
    })

    // Calculate needle angle
    const percentage = (score - minScore) / (maxScore - minScore)
    const needleAngle = Math.PI + percentage * Math.PI

    // Draw needle
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(needleAngle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -radius + 10)
    ctx.strokeStyle = '#00c2ff'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI)
    ctx.fillStyle = '#00c2ff'
    ctx.fill()
  }, [score, maxScore, minScore])

  const getRatingColor = (score: number) => {
    if (score < 580) return 'text-red-400'
    if (score < 670) return 'text-yellow-400'
    if (score < 740) return 'text-green-400'
    if (score < 800) return 'text-blue-400'
    return 'text-cyan-400'
  }

  const getRating = (score: number) => {
    if (score < 580) return 'Poor'
    if (score < 670) return 'Fair'
    if (score < 740) return 'Good'
    if (score < 800) return 'Very Good'
    return 'Excellent'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <canvas ref={canvasRef} width={200} height={120} className="w-full max-w-xs" />
      <div className="text-center space-y-2">
        <p className="text-sm text-foreground/60">Your Credit Score</p>
        <p className={`text-4xl font-bold ${getRatingColor(score)}`}>{score}</p>
        <p className={`text-sm font-medium ${getRatingColor(score)}`}>{getRating(score)}</p>
      </div>
    </div>
  )
}
