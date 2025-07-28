"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedImageProps {
  children: React.ReactNode
  delay?: number
}

export function AnimatedImage({ children, delay = 0 }: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
