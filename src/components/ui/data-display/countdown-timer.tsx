'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +targetDate - +new Date()
  let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

const AnimatedNumber = ({ value }: { value: number | string }) => (
  <div className="relative h-16 w-16 overflow-hidden rounded bg-primary">
    <AnimatePresence mode="popLayout">
      <motion.div
        key={value}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        exit={{ y: 64 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary-foreground"
      >
        {value}
      </motion.div>
    </AnimatePresence>
  </div>
)

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  var { days, hours, minutes, seconds }: { days: number | string, hours: number | string, minutes: number | string, seconds: number | string } = timeLeft
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    days = "N"
    hours = "O"
    minutes = "W"
    seconds = "!"
  }

  return (
    <div className="flex justify-center space-x-4">
      <div className="flex flex-col items-center">
        <AnimatedNumber value={days} />
        <span className="mt-2 text-sm text-muted-foreground">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <AnimatedNumber value={hours} />
        <span className="mt-2 text-sm text-muted-foreground">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <AnimatedNumber value={minutes} />
        <span className="mt-2 text-sm text-muted-foreground">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <AnimatedNumber value={seconds} />
        <span className="mt-2 text-sm text-muted-foreground">Seconds</span>
      </div>
    </div>
  )
}

export default CountdownTimer
