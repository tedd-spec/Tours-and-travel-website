import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function BookingConfirmation({
  searchParams,
}: {
  searchParams: { orderId?: string; type?: string }
}) {
  // Redirect if no order ID is provided (prevents direct access)
  if (!searchParams.orderId) {
    redirect("/")
  }

  const bookingType = searchParams.type || "booking"
  const orderId = searchParams.orderId

  const getTitle = () => {
    switch (bookingType) {
      case "car":
        return "Car Booking Confirmed!"
      case "accommodation":
        return "Accommodation Booking Confirmed!"
      case "package":
        return "Package Tour Booking Confirmed!"
      default:
        return "Booking Confirmed!"
    }
  }

  const getMessage = () => {
    return `Your booking has been confirmed with order ID: ${orderId}. You'll receive a confirmation email with all the details shortly.`
  }

  const getImageSrc = () => {
    switch (bookingType) {
      case "car":
        return "/images/safari-jeep.jpg"
      case "accommodation":
        return "/images/luxury-lodge.jpg"
      case "package":
        return "/images/serengeti.jpg"
      default:
        return "/images/safari-jeep.jpg"
    }
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-24">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-full bg-primary/20 p-3">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{getTitle()}</h1>

            <p className="text-muted-foreground text-lg max-w-2xl mb-8">{getMessage()}</p>

            <div className="w-full max-w-md rounded-xl overflow-hidden mb-8">
              <Image
                src={getImageSrc() || "/placeholder.svg"}
                alt="Booking confirmation"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="group">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Return to Home
                </Link>
              </Button>

              <Button variant="outline" asChild>
                <Link href="/profile">View My Bookings</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}
