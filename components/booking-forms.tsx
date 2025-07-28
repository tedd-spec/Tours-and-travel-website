"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Car, MapPin, Moon, TreePalmIcon as PalmTree } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { useToast } from "@/components/ui/use-toast"
import { bookCar, bookAccommodation, bookPackage } from "@/lib/actions"

export function BookingForms() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Car booking form state
  const [carForm, setCarForm] = useState({
    pickupLocation: "",
    carType: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  })

  // Accommodation booking form state
  const [accommodationForm, setAccommodationForm] = useState({
    destination: "",
    roomType: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
  })

  // Package booking form state
  const [packageForm, setPackageForm] = useState({
    destination: "",
    travelers: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
  })

  // Handle car booking form submission
  const handleCarBooking = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to book car
      await bookCar(carForm)

      toast({
        title: "Car Booking Successful!",
        description: `Your ${carForm.carType} has been booked for pickup at ${carForm.pickupLocation}.`,
        variant: "success",
      })

      // Redirect to confirmation page
      router.push("/booking-confirmation?type=car")
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle accommodation booking form submission
  const handleAccommodationBooking = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to book accommodation
      await bookAccommodation(accommodationForm)

      toast({
        title: "Accommodation Booking Successful!",
        description: `Your ${accommodationForm.roomType} has been booked in ${accommodationForm.destination}.`,
        variant: "success",
      })

      // Redirect to confirmation page
      router.push("/booking-confirmation?type=accommodation")
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle package booking form submission
  const handlePackageBooking = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to book package
      await bookPackage(packageForm)

      toast({
        title: "Package Booking Successful!",
        description: `Your tour package to ${packageForm.destination} for ${packageForm.travelers} has been booked.`,
        variant: "success",
      })

      // Redirect to confirmation page
      router.push("/booking-confirmation?type=package")
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="car" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
        <TabsTrigger
          value="car"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <Car className="mr-2 h-4 w-4" /> Car Rental
        </TabsTrigger>
        <TabsTrigger
          value="accommodation"
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <Moon className="mr-2 h-4 w-4" /> Accommodation
        </TabsTrigger>
        <TabsTrigger
          value="package"
          className="hidden md:flex data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
        >
          <PalmTree className="mr-2 h-4 w-4" /> Package Tour
        </TabsTrigger>
      </TabsList>

      <TabsContent value="car" className="mt-6">
        <form onSubmit={handleCarBooking} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pickup-location">Pickup Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup-location"
                  placeholder="Enter pickup location"
                  className="pl-10"
                  value={carForm.pickupLocation}
                  onChange={(e) => setCarForm({ ...carForm, pickupLocation: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="car-type">Car Type</Label>
              <Select
                value={carForm.carType}
                onValueChange={(value) => setCarForm({ ...carForm, carType: value })}
                required
              >
                <SelectTrigger id="car-type">
                  <SelectValue placeholder="Select car type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="van">Van/Minibus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Rental Period</Label>
              <DatePickerWithRange
                className="[&>button]:border-primary [&>button:hover]:bg-primary/10"
                onChange={(range) => setCarForm({ ...carForm, dateRange: range })}
                value={carForm.dateRange}
              />
            </div>

            <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
              <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? "Processing..." : "Search Available Cars"}
                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="accommodation" className="mt-6">
        <form onSubmit={handleAccommodationBooking} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  className="pl-10"
                  value={accommodationForm.destination}
                  onChange={(e) => setAccommodationForm({ ...accommodationForm, destination: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room-type">Room Type</Label>
              <Select
                value={accommodationForm.roomType}
                onValueChange={(value) => setAccommodationForm({ ...accommodationForm, roomType: value })}
                required
              >
                <SelectTrigger id="room-type">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Room</SelectItem>
                  <SelectItem value="double">Double Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Stay Period</Label>
              <DatePickerWithRange
                className="[&>button]:border-primary [&>button:hover]:bg-primary/10"
                onChange={(range) => setAccommodationForm({ ...accommodationForm, dateRange: range })}
                value={accommodationForm.dateRange}
              />
            </div>

            <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
              <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? "Processing..." : "Search Accommodations"}
                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="package" className="mt-6">
        <form onSubmit={handlePackageBooking} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="package-destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="package-destination"
                  placeholder="Where would you like to go?"
                  className="pl-10"
                  value={packageForm.destination}
                  onChange={(e) => setPackageForm({ ...packageForm, destination: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers</Label>
              <Select
                value={packageForm.travelers}
                onValueChange={(value) => setPackageForm({ ...packageForm, travelers: value })}
                required
              >
                <SelectTrigger id="travelers">
                  <SelectValue placeholder="Select number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4+">4+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Travel Period</Label>
              <DatePickerWithRange
                className="[&>button]:border-primary [&>button:hover]:bg-primary/10"
                onChange={(range) => setPackageForm({ ...packageForm, dateRange: range })}
                value={packageForm.dateRange}
              />
            </div>

            <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
              <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? "Processing..." : "Find Package Tours"}
                {!isSubmitting && (
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  )
}
