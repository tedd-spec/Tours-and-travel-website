import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin } from "lucide-react"

// Mock destinations data (in a real app, this would come from a database)
const destinations = [
  {
    id: "serengeti",
    name: "Serengeti National Park",
    location: "Tanzania",
    description: "Home to the great migration, with millions of wildebeest, zebra, and gazelle.",
    image: "/images/serengeti.jpg",
    price: 500,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "maasai-mara",
    name: "Maasai Mara Reserve",
    location: "Kenya",
    description: "Famous for its exceptional population of big cats and the annual wildebeest migration.",
    image: "/images/maasai-mara.jpg",
    price: 450,
    rating: 4.8,
    reviews: 112,
  },
  {
    id: "kruger",
    name: "Kruger National Park",
    location: "South Africa",
    description: "One of Africa's largest game reserves, home to the Big Five and hundreds of other species.",
    image: "/images/kruger.jpg",
    price: 480,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: "amboseli",
    name: "Amboseli National Park",
    location: "Kenya",
    description: "Known for its large elephant herds and views of Mount Kilimanjaro.",
    image: "/images/serengeti.jpg", // Using serengeti image as placeholder
    price: 420,
    rating: 4.6,
    reviews: 86,
  },
  {
    id: "bwindi",
    name: "Bwindi Impenetrable Forest",
    location: "Uganda",
    description: "Home to half the world's population of endangered mountain gorillas.",
    image: "/images/maasai-mara.jpg", // Using maasai-mara image as placeholder
    price: 550,
    rating: 4.9,
    reviews: 74,
  },
  {
    id: "chobe",
    name: "Chobe National Park",
    location: "Botswana",
    description: "Famous for its large herds of elephants and abundant wildlife along the Chobe River.",
    image: "/images/kruger.jpg", // Using kruger image as placeholder
    price: 470,
    rating: 4.7,
    reviews: 92,
  },
]

export default function DestinationsPage() {
  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Explore Our Destinations</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Discover the most breathtaking wildlife destinations across Africa
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <ScrollReveal key={destination.id} delay={index * 0.1}>
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/50 text-white text-sm px-2 py-1 rounded-full">
                    <MapPin className="h-3 w-3 mr-1" />
                    {destination.location}
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium">{destination.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({destination.reviews})</span>
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground flex-grow">{destination.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-bold text-lg">
                      ${destination.price}
                      <span className="text-sm font-normal text-muted-foreground"> /person</span>
                    </p>
                    <Button variant="outline" className="group relative overflow-hidden" asChild>
                      <Link href={`/destinations/${destination.id}`}>
                        <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative flex items-center">
                          View Details{" "}
                          <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
