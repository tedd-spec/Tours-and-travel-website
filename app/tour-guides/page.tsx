import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Languages, Award } from "lucide-react"

// Mock tour guides data (in a real app, this would come from a database)
const tourGuides = [
  {
    id: "james-kimathi",
    name: "James Kimathi",
    specialty: "Wildlife Expert",
    location: "Nairobi, Kenya",
    image: "/images/guide-1.png",
    languages: ["English", "Swahili", "Maasai"],
    experience: 15,
    rating: 4.9,
    reviews: 128,
    price: 120,
    bio: "James has been leading safari tours for over 15 years across East Africa. He specializes in tracking big cats and has extensive knowledge of the Serengeti and Maasai Mara ecosystems.",
    expertise: ["Big Cat Tracking", "Bird Watching", "Wildlife Photography"],
    certifications: ["Kenya Professional Safari Guide", "First Aid & CPR", "Conservation Leadership"],
  },
  {
    id: "sarah-omondi",
    name: "Sarah Omondi",
    specialty: "Bird Specialist",
    location: "Mombasa, Kenya",
    image: "/images/guide-2.png",
    languages: ["English", "Swahili", "French"],
    experience: 12,
    rating: 4.8,
    reviews: 96,
    price: 110,
    bio: "Sarah is an ornithologist with knowledge of over 500 bird species across East Africa. She specializes in bird photography and has contributed to several field guides on African birds.",
    expertise: ["Bird Identification", "Wildlife Photography", "Ecosystem Conservation"],
    certifications: ["Ornithological Society Certification", "Advanced Photography", "Wilderness First Responder"],
  },
  {
    id: "daniel-mwangi",
    name: "Daniel Mwangi",
    specialty: "Cultural Expert",
    location: "Arusha, Tanzania",
    image: "/images/guide-3.png",
    languages: ["English", "Swahili", "Maasai", "German"],
    experience: 10,
    rating: 4.7,
    reviews: 84,
    price: 100,
    bio: "Daniel comes from a Maasai background and specializes in cultural tours. He provides deep insights into local traditions, customs, and the relationship between communities and wildlife.",
    expertise: ["Cultural Heritage", "Traditional Medicine", "Community Conservation"],
    certifications: ["Cultural Heritage Guide", "Community Development", "Sustainable Tourism"],
  },
  {
    id: "lisa-njoroge",
    name: "Lisa Njoroge",
    specialty: "Photography Guide",
    location: "Nairobi, Kenya",
    image: "/images/guide-4.png",
    languages: ["English", "Swahili", "Italian"],
    experience: 8,
    rating: 4.9,
    reviews: 76,
    price: 130,
    bio: "Lisa is a professional wildlife photographer who has been published in National Geographic. She helps guests capture the perfect safari moments and offers photography workshops.",
    expertise: ["Wildlife Photography", "Landscape Photography", "Photo Editing"],
    certifications: ["Professional Photography", "Adobe Certified Expert", "Safari Guide Level II"],
  },
  {
    id: "michael-oloo",
    name: "Michael Oloo",
    specialty: "Ecology Expert",
    location: "Kampala, Uganda",
    image: "/images/guide-1.png", // Reusing image as placeholder
    languages: ["English", "Swahili", "Luganda"],
    experience: 14,
    rating: 4.8,
    reviews: 92,
    price: 115,
    bio: "Michael has a background in ecology and specializes in explaining the complex relationships within African ecosystems. He's particularly knowledgeable about gorilla habitats.",
    expertise: ["Gorilla Trekking", "Forest Ecology", "Conservation"],
    certifications: ["Ecology Degree", "Gorilla Habituation", "Advanced Tracking"],
  },
  {
    id: "amina-hassan",
    name: "Amina Hassan",
    specialty: "Adventure Guide",
    location: "Dar es Salaam, Tanzania",
    image: "/images/guide-2.png", // Reusing image as placeholder
    languages: ["English", "Swahili", "Arabic"],
    experience: 9,
    rating: 4.7,
    reviews: 68,
    price: 105,
    bio: "Amina specializes in adventure safaris that combine wildlife viewing with activities like hiking, canoeing, and camping. She's an expert in safety and wilderness survival.",
    expertise: ["Adventure Activities", "Survival Skills", "Night Safaris"],
    certifications: ["Wilderness Guide", "Advanced First Aid", "Water Safety"],
  },
  {
    id: "john-mutua",
    name: "John Mutua",
    specialty: "Big Five Expert",
    location: "Nairobi, Kenya",
    image: "/images/guide-3.png", // Reusing image as placeholder
    languages: ["English", "Swahili", "Spanish"],
    experience: 18,
    rating: 4.9,
    reviews: 142,
    price: 125,
    bio: "John is renowned for his ability to track and find the Big Five. With nearly two decades of experience, he knows the best spots and times to view these magnificent animals.",
    expertise: ["Big Five Tracking", "Animal Behavior", "Conservation"],
    certifications: ["Master Safari Guide", "Tracking Specialist", "Conservation Ambassador"],
  },
  {
    id: "grace-wanjiku",
    name: "Grace Wanjiku",
    specialty: "Family Safari Expert",
    location: "Mombasa, Kenya",
    image: "/images/guide-4.png", // Reusing image as placeholder
    languages: ["English", "Swahili", "French"],
    experience: 11,
    rating: 4.8,
    reviews: 88,
    price: 110,
    bio: "Grace specializes in family-friendly safaris, making wildlife exciting and educational for children while ensuring parents have an amazing experience too.",
    expertise: ["Family Safaris", "Educational Tours", "Wildlife for Kids"],
    certifications: ["Child Safety", "Environmental Education", "First Aid"],
  },
]

export default function TourGuidesPage() {
  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Meet Our Expert Tour Guides</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Experienced professionals who will enhance your safari experience with their knowledge and passion
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tourGuides.map((guide, index) => (
            <ScrollReveal key={guide.id} delay={index * 0.1}>
              <Card className="overflow-hidden group h-full flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.name}
                    width={400}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-primary hover:bg-primary/90">{guide.specialty}</Badge>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold">{guide.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {guide.location}
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{guide.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({guide.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <Languages className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{guide.languages.join(", ")}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <Award className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{guide.experience} years experience</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{guide.bio}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-bold">
                      ${guide.price}
                      <span className="text-sm font-normal text-muted-foreground"> /day</span>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/tour-guides/${guide.id}`}>Profile</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/cart?add=guide-${guide.id}`}>Book</Link>
                      </Button>
                    </div>
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
