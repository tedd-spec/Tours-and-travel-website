import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYou() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-primary/20 p-3">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Thank You for Contacting Us!</h1>

        <p className="text-muted-foreground text-lg max-w-2xl mb-8">
          We've received your inquiry and will get back to you as soon as possible. A member of our team will contact
          you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="group">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Return to Home
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="#destinations">Explore Destinations</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
