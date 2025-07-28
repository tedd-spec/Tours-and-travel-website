import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Shield, Utensils, Wifi, Camera, Award } from "lucide-react"
import { addToCart } from "@/lib/cart"

// Mock destinations data (in a real app, this would come from a database)
const destinations = {
  serengeti: {
    id: "serengeti",
    name: "Serengeti National Park",
    location: "Tanzania",
    description:
      "The Serengeti National Park is a vast ecosystem in north-western Tanzania, extending to south-western Kenya. It spans approximately 30,000 square kilometers and is known for its annual migration of over 1.5 million wildebeest and 250,000 zebra. The park is home to the 'Big Five' (lion, leopard, elephant, buffalo, and rhino) and offers some of the most spectacular wildlife viewing opportunities in the world.",
    longDescription:
      "The Serengeti ecosystem is one of the oldest on earth. The essential features of climate, vegetation and fauna have barely changed in the past million years. Early human ancestors lived in the region for millions of years. The name 'Serengeti' comes from the Maasai language and means 'endless plains'.\n\nThe park is Tanzania's oldest national park and remains the flagship of the country's tourism industry, providing a major draw for visitors from around the world. It is particularly famous for its annual migration, a stunning phenomenon where millions of wildebeest, zebra, and Thomson's gazelle travel in a clockwise direction around the Serengeti-Mara ecosystem, crossing the Mara River in search of fresh pasture.",
    image: "/images/serengeti.jpg",
    gallery: ["/images/serengeti.jpg", "/images/migration.jpg", "/images/conservation.jpg"],
    price: 500,
    rating: 4.9,
    reviews: 128,
    duration: "5 days",
    groupSize: "2-12 people",
    includes: ["Safari game drives", "Accommodation", "Meals", "Professional guide", "Park fees"],
    highlights: ["Great Migration", "Big Five sightings", "Balloon safari option", "Maasai cultural visits"],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Transfer",
        description:
          "Arrive at Kilimanjaro International Airport and transfer to your accommodation in Arusha. Meet your guide for a briefing about your upcoming safari adventure.",
      },
      {
        day: 2,
        title: "Serengeti Central",
        description:
          "After breakfast, fly to Serengeti National Park. Enjoy an afternoon game drive in the central Serengeti, known for its rich wildlife. Overnight at a safari lodge.",
      },
      {
        day: 3,
        title: "Full Day Game Drive",
        description:
          "Full day exploring the Serengeti plains. Search for the Big Five and witness the incredible biodiversity of the region. Optional hot air balloon safari at dawn (additional cost).",
      },
      {
        day: 4,
        title: "Northern Serengeti",
        description:
          "Drive to the northern Serengeti to witness the Great Migration (seasonal). Watch dramatic river crossings and predator-prey interactions. Overnight at a tented camp.",
      },
      {
        day: 5,
        title: "Departure",
        description:
          "Final morning game drive before flying back to Arusha. Transfer to Kilimanjaro International Airport for your departure flight.",
      },
    ],
    tourId: "serengeti-tour",
  },
  "maasai-mara": {
    id: "maasai-mara",
    name: "Maasai Mara Reserve",
    location: "Kenya",
    description: "Famous for its exceptional population of big cats and the annual wildebeest migration.",
    longDescription:
      "The Maasai Mara National Reserve is a large game reserve in Narok County, Kenya, contiguous with the Serengeti National Park in Tanzania. It is named in honor of the Maasai people, the ancestral inhabitants of the area, and their description of the area when looked at from afar: 'Mara' means 'spotted' in the local Maasai language, due to the many short bushy trees which dot the landscape.\n\nThe reserve is globally famous for its exceptional population of lions, leopards and cheetahs, and the annual migration of zebra, Thomson's gazelle, and wildebeest from the Serengeti every year from July to October, known as the Great Migration.",
    image: "/images/maasai-mara.jpg",
    gallery: ["/images/maasai-mara.jpg", "/images/migration.jpg", "/images/conservation.jpg"],
    price: 450,
    rating: 4.8,
    reviews: 112,
    duration: "4 days",
    groupSize: "2-10 people",
    includes: ["Safari game drives", "Accommodation", "Meals", "Professional guide", "Park fees"],
    highlights: ["Great Migration", "Big cat sightings", "Maasai village visit", "Hot air balloon option"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        description:
          "Arrive at Jomo Kenyatta International Airport and transfer to your hotel in Nairobi. Evening briefing about your safari.",
      },
      {
        day: 2,
        title: "Nairobi to Maasai Mara",
        description:
          "Drive to the Maasai Mara National Reserve. Afternoon game drive to spot the abundant wildlife. Overnight at a safari lodge.",
      },
      {
        day: 3,
        title: "Full Day in Maasai Mara",
        description:
          "Full day exploring the Maasai Mara. Search for the Big Five and witness the incredible biodiversity. Optional visit to a Maasai village (additional cost).",
      },
      {
        day: 4,
        title: "Departure",
        description:
          "Final morning game drive before returning to Nairobi. Transfer to Jomo Kenyatta International Airport for your departure flight.",
      },
    ],
    tourId: "maasai-mara-tour",
  },
  kruger: {
    id: "kruger",
    name: "Kruger National Park",
    location: "South Africa",
    description: "One of Africa's largest game reserves, home to the Big Five and hundreds of other species.",
    longDescription:
      "Kruger National Park is one of Africa's largest game reserves, covering an area of 19,485 square kilometers in northeastern South Africa. The park is part of the Kruger to Canyons Biosphere, an area designated by UNESCO as an International Man and Biosphere Reserve.\n\nThe park is home to an impressive diversity of species: 336 trees, 49 fish, 34 amphibians, 114 reptiles, 507 birds and 147 mammals. Kruger is home to the Big Five (lion, leopard, rhino, elephant, and Cape buffalo) as well as many other species. The park has a rich history and archaeological sites like Masorini and Thulamela that are open to visitors.",
    image: "/images/kruger.jpg",
    gallery: ["/images/kruger.jpg", "/images/migration.jpg", "/images/conservation.jpg"],
    price: 480,
    rating: 4.7,
    reviews: 98,
    duration: "6 days",
    groupSize: "2-8 people",
    includes: ["Safari game drives", "Accommodation", "Meals", "Professional guide", "Park fees"],
    highlights: ["Big Five sightings", "Night safari drives", "Walking safaris", "Luxury lodges"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Johannesburg",
        description:
          "Arrive at O.R. Tambo International Airport and transfer to your hotel in Johannesburg. Evening briefing about your safari.",
      },
      {
        day: 2,
        title: "Johannesburg to Kruger",
        description:
          "Drive to Kruger National Park. Afternoon game drive to begin your wildlife viewing experience. Overnight at a safari lodge.",
      },
      {
        day: 3,
        title: "Southern Kruger",
        description:
          "Full day exploring the southern region of Kruger, known for its high concentration of rhinos and big cats. Night safari drive option.",
      },
      {
        day: 4,
        title: "Central Kruger",
        description:
          "Game drive through the central region of Kruger, with diverse landscapes and abundant wildlife. Optional walking safari (additional cost).",
      },
      {
        day: 5,
        title: "Northern Kruger",
        description:
          "Explore the less-visited northern region of Kruger, known for its fever tree forests and unique wildlife. Bird watching opportunities.",
      },
      {
        day: 6,
        title: "Departure",
        description:
          "Final morning game drive before returning to Johannesburg. Transfer to O.R. Tambo International Airport for your departure flight.",
      },
    ],
    tourId: "kruger-tour",
  },
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = destinations[params.id]

  if (!destination) {
    notFound()
  }

  async function addDestinationToCart() {
    "use server"
    await addToCart(destination.tourId)
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4 group" asChild>
            <Link href="/destinations">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Destinations
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">{destination.name}</h1>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span>{destination.location}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{destination.rating}</span>
                    <span className="text-muted-foreground ml-1">({destination.reviews} reviews)</span>
                  </span>
                </div>
                <p className="text-muted-foreground">{destination.description}</p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    <span>{destination.groupSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span>Best time: Jun-Oct</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">${destination.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    <form action={addDestinationToCart}>
                      <Button size="lg" className="group relative overflow-hidden" type="submit">
                        <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative">Add to Cart</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                  <p className="whitespace-pre-line text-muted-foreground mb-6">{destination.longDescription}</p>

                  <h3 className="text-xl font-bold mb-4">Tour Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {destination.includes.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 mt-8">
                    <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                      <Utensils className="h-8 w-8 text-primary mb-2" />
                      <h4 className="font-bold">Meals Included</h4>
                      <p className="text-sm text-center text-muted-foreground">All meals during the safari</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                      <Wifi className="h-8 w-8 text-primary mb-2" />
                      <h4 className="font-bold">Wi-Fi Available</h4>
                      <p className="text-sm text-center text-muted-foreground">At lodges and camps</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                      <Camera className="h-8 w-8 text-primary mb-2" />
                      <h4 className="font-bold">Photo Opportunities</h4>
                      <p className="text-sm text-center text-muted-foreground">Perfect for photography</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="itinerary" className="mt-6">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>

                  <div className="space-y-8">
                    {destination.itinerary.map((day) => (
                      <div key={day.day} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <div>
                          <h3 className="text-xl font-bold">
                            Day {day.day}: {day.title}
                          </h3>
                          <p className="mt-2 text-muted-foreground">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {destination.gallery.map((image, index) => (
                      <div key={index} className="relative h-60 rounded-lg overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${destination.name} - Image ${index + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ScrollReveal>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                  <div className="flex items-center mb-8">
                    <div className="mr-4">
                      <p className="text-5xl font-bold">{destination.rating}</p>
                      <div className="flex text-yellow-500 mt-1">
                        {"★".repeat(Math.floor(destination.rating))}
                        {destination.rating % 1 !== 0 && "½"}
                      </div>
                      <p className="text-sm text-muted-foreground">{destination.reviews} reviews</p>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center">
                        <span className="w-20 text-sm">5 stars</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">4 stars</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">3 stars</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">2 stars</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-sm">1 star</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: "0%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <span className="font-bold">JD</span>
                          </div>
                          <div>
                            <p className="font-bold">John Davis</p>
                            <p className="text-xs text-muted-foreground">Visited in June 2023</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-500">★★★★★</div>
                      </div>
                      <p className="text-muted-foreground">
                        Our safari in {destination.name} was absolutely incredible! We saw all of the Big Five within
                        the first two days. Our guide was knowledgeable and friendly, making the experience even better.
                        The accommodations were comfortable and the food was delicious. Highly recommend!
                      </p>
                    </div>

                    <div className="border-b pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <span className="font-bold">SM</span>
                          </div>
                          <div>
                            <p className="font-bold">Sarah Miller</p>
                            <p className="text-xs text-muted-foreground">Visited in August 2023</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-500">★★★★★</div>
                      </div>
                      <p className="text-muted-foreground">
                        This was our second visit to {destination.name} and it was even better than the first! The
                        wildlife viewing was spectacular, especially the lion pride with cubs. The balloon safari was
                        worth every penny for the amazing views. Can't wait to return!
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                            <span className="font-bold">RJ</span>
                          </div>
                          <div>
                            <p className="font-bold">Robert Johnson</p>
                            <p className="text-xs text-muted-foreground">Visited in May 2023</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-500">
                          ★★★★<span className="text-muted">★</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Great experience overall at {destination.name}. We saw amazing wildlife and the landscapes were
                        breathtaking. The only downside was that our lodge was a bit far from the main wildlife areas,
                        so we spent more time driving than we would have liked. Still, a wonderful trip!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  )
}
