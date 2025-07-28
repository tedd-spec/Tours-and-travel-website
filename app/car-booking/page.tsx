"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { ArrowLeft, Users, Calendar, DollarSign } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { useToast } from "@/components/ui/use-toast"

// Vehicle data with capacity and pricing
const vehicles = {
  "safari-jeep": {
    id: "safari-jeep",
    name: "Safari Jeep",
    description: "Open-top 4x4 vehicles perfect for game viewing",
    image: "/images/safari-jeep.jpg",
    basePrice: 120,
    maxCapacity: 4,
    features: ["Open-top design", "4x4 capability", "Professional driver", "Game viewing equipment"],
  },
  "land-cruiser": {
    id: "land-cruiser",
    name: "Land Cruiser",
    description: "Comfortable 4x4 with pop-up roof for photography",
    image: "/images/land-cruiser.jpg",
    basePrice: 150,
    maxCapacity: 6,
    features: ["Pop-up roof", "Air conditioning", "Photography equipment", "Comfortable seating"],
  },
  "safari-van": {
    id: "safari-van",
    name: "Safari Van",
    description: "Spacious vehicle with sliding windows for groups",
    image: "/images/safari-van.jpg",
    basePrice: 180,
    maxCapacity: 8,
    features: ["Sliding windows", "Group seating", "Storage space", "Professional guide"],
  },
  "luxury-suv": {
    id: "luxury-suv",
    name: "Luxury SUV",
    description: "Premium vehicle with AC and enhanced comfort",
    image: "/images/luxury-suv.jpg",
    basePrice: 220,
    maxCapacity: 4,
    features: ["Luxury interior", "Premium sound system", "Climate control", "Refreshments included"],
  },
}

export default function CarBookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const vehicleId = searchParams.get("vehicle") || "safari-jeep"
  const vehicle = vehicles[vehicleId]

  const [numberOfPeople, setNumberOfPeople] = useState(2)
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })
  const [isLoading, setIsLoading] = useState(false)

  if (!vehicle) {
    return <div>Vehicle not found</div>
  }

  // Calculate total price based on number of people and days
  const calculateTotalPrice = () => {
    const days =
      dateRange.to && dateRange.from
        ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
        : 1

    // Base price per day, with additional cost per person over 2 people
    const additionalPeopleCost = Math.max(0, numberOfPeople - 2) * 25 // $25 per additional person per day
    const dailyRate = vehicle.basePrice + additionalPeopleCost

    return dailyRate * days
  }

  const handleBooking = async () => {
    setIsLoading(true)

    try {
      const totalPrice = calculateTotalPrice()
      const days =
        dateRange.to && dateRange.from
          ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
          : 1

      // Add to cart with custom pricing and details
      await addToCart(
        vehicle.id,
        1,
        dateRange.from?.toISOString().split("T")[0],
        dateRange.to?.toISOString().split("T")[0],
        {
          numberOfPeople,
          totalPrice,
          days,
          customName: `${vehicle.name} (${numberOfPeople} people, ${days} days)`,
        },
      )

      toast({
        title: "Added to Cart!",
        description: `${vehicle.name} for ${numberOfPeople} people has been added to your cart.`,
      })

      router.push("/cart")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add vehicle to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4 group bg-transparent" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">{vehicle.name}</h1>
                  <p className="mt-2 text-muted-foreground">{vehicle.description}</p>
                </div>

                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Features Included</h3>
                  <div className="grid gap-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Book Your Vehicle</h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="people">Number of People</Label>
                      <Select
                        value={numberOfPeople.toString()}
                        onValueChange={(value) => setNumberOfPeople(Number.parseInt(value))}
                      >
                        <SelectTrigger id="people">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: vehicle.maxCapacity }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "person" : "people"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Maximum capacity: {vehicle.maxCapacity} people</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Rental Period</Label>
                      <DatePickerWithRange
                        value={dateRange}
                        onChange={setDateRange}
                        className="[&>button]:border-primary [&>button:hover]:bg-primary/10"
                      />
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-bold mb-4">Pricing Breakdown</h3>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base rate per day:</span>
                          <span>${vehicle.basePrice}</span>
                        </div>

                        {numberOfPeople > 2 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Additional people ({numberOfPeople - 2} × $25/day):
                            </span>
                            <span>${(numberOfPeople - 2) * 25}</span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Number of days:</span>
                          <span>
                            {dateRange.to && dateRange.from
                              ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
                              : 1}
                          </span>
                        </div>

                        <div className="border-t pt-3 flex justify-between font-bold text-lg">
                          <span>Total Price:</span>
                          <span>${calculateTotalPrice()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 pt-4">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-primary mr-2" />
                        <span>{numberOfPeople} people</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span>
                          {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                        <span>${calculateTotalPrice()} total</span>
                      </div>
                    </div>

                    <Button
                      className="w-full group relative overflow-hidden"
                      onClick={handleBooking}
                      disabled={isLoading}
                    >
                      <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative">{isLoading ? "Adding to Cart..." : "Add to Cart"}</span>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      You can review and modify your booking in the cart before checkout
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
