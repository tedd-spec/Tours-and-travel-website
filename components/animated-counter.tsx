"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ value, duration = 1, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      animateCount(timestamp)
    }

    const animateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * value)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-4xl font-bold">
      {count}
      {suffix}
    </div>
  )
}
