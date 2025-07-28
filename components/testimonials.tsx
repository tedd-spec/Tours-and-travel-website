"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/testimonial-1.jpg",
    text: "Our safari with Bania Tours was absolutely incredible! The guides were knowledgeable, the accommodations were luxurious, and we saw all of the Big Five. It was truly the trip of a lifetime.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    location: "Toronto, Canada",
    image: "/images/testimonial-2.jpg",
    text: "The attention to detail was impressive. From the moment we landed until our departure, everything was perfectly organized. The safari vehicles were comfortable and the wildlife sightings were spectacular.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Williams",
    location: "London, UK",
    image: "/images/testimonial-3.jpg",
    text: "We booked a family safari and it exceeded all our expectations. The staff was amazing with our children, and the special activities they arranged made this an educational and fun experience for everyone.",
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 md:py-24 bg-muted/30">
      <div className="container">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Travelers Say</h2>
            <p className="mt-4 text-muted-foreground">
              Read testimonials from our satisfied customers who have experienced the magic of African safaris with us.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5">
                    <div className="relative h-64 md:h-auto md:col-span-2">
                      <Image
                        src={testimonials[current].image || "/placeholder.svg"}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 md:p-8 md:col-span-3 relative">
                      <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <p className="text-lg italic mb-6">"{testimonials[current].text}"</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonials[current].rating)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold">{testimonials[current].name}</h3>
                          <p className="text-muted-foreground">{testimonials[current].location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === current ? "bg-primary" : "bg-primary/20"
                  }`}
                  onClick={() => {
                    setAutoplay(false)
                    setCurrent(index)
                  }}
                >
                  <span className="sr-only">Testimonial {index + 1}</span>
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
