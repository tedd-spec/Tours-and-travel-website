import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, MapPin, Languages, Award, CheckCircle, Calendar, Users } from "lucide-react"
import { addToCart } from "@/lib/cart"

// Mock tour guides data (in a real app, this would come from a database)
const tourGuides = {
  "james-kimathi": {
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
    bio: "James has been leading safari tours for over 15 years across East Africa. He specializes in tracking big cats and has extensive knowledge of the Serengeti and Maasai Mara ecosystems. His passion for wildlife conservation and deep understanding of animal behavior makes him one of the most sought-after guides in the region.",
    longBio:
      "Born and raised in the heart of Kenya's wildlife country, James developed a love for nature at an early age. After completing his studies in Wildlife Management, he began his career as a safari guide and has since led over 1,000 successful safari expeditions. James is particularly skilled at tracking the Big Five and has an exceptional ability to predict animal movements based on weather patterns and seasonal changes.\n\nHis expertise extends beyond wildlife viewing to include conservation education, where he helps visitors understand the delicate balance of African ecosystems. James has contributed to several wildlife research projects and is actively involved in community conservation initiatives.",
    expertise: [
      "Big Cat Tracking",
      "Bird Watching",
      "Wildlife Photography",
      "Conservation Education",
      "Night Game Drives",
    ],
    certifications: [
      "Kenya Professional Safari Guide Level III",
      "First Aid & CPR Certified",
      "Conservation Leadership Certificate",
      "Wildlife Photography Workshop Leader",
    ],
    achievements: [
      "Led over 1,000 successful safari expeditions",
      "Contributed to 3 wildlife research publications",
      "Trained 25+ junior safari guides",
      "Recipient of Kenya Tourism Excellence Award 2022",
    ],
    availability: "Available year-round",
    maxGroupSize: 8,
    specialDestinations: ["Maasai Mara", "Serengeti", "Amboseli", "Tsavo"],
  },
  "sarah-omondi": {
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
    longBio:
      "Sarah's journey into ornithology began during her university studies in Zoology. Her fascination with avian behavior and migration patterns led her to specialize in bird guiding. She has documented rare bird species and their habitats, contributing valuable data to conservation efforts.\n\nAs a certified bird guide, Sarah combines scientific knowledge with practical field experience to offer guests an unparalleled birding experience. Her photography skills help visitors capture stunning images of both common and rare species.",
    expertise: [
      "Bird Identification",
      "Wildlife Photography",
      "Ecosystem Conservation",
      "Migration Patterns",
      "Habitat Analysis",
    ],
    certifications: [
      "Ornithological Society Certification",
      "Advanced Photography Certificate",
      "Wilderness First Responder",
      "Environmental Education Specialist",
    ],
    achievements: [
      "Documented 15 rare bird species in East Africa",
      "Published in 2 ornithological journals",
      "Led birding expeditions to 12 countries",
      "Photography featured in National Geographic",
    ],
    availability: "Best during migration seasons (Nov-Apr, Jul-Oct)",
    maxGroupSize: 6,
    specialDestinations: ["Lake Nakuru", "Samburu", "Kakamega Forest", "Arabuko Sokoke"],
  },
  "daniel-mwangi": {
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
    longBio:
      "Daniel was born into a traditional Maasai family and grew up learning the ancient ways of his people. His unique position as both a cultural insider and professional guide allows him to bridge the gap between traditional life and modern tourism.\n\nHe is passionate about sharing authentic Maasai culture while promoting sustainable tourism that benefits local communities. Daniel's tours include visits to traditional bomas, participation in cultural ceremonies, and learning about traditional medicine and livestock practices.",
    expertise: [
      "Cultural Heritage",
      "Traditional Medicine",
      "Community Conservation",
      "Livestock Management",
      "Traditional Crafts",
    ],
    certifications: [
      "Cultural Heritage Guide Certificate",
      "Community Development Diploma",
      "Sustainable Tourism Certification",
      "Traditional Medicine Knowledge",
    ],
    achievements: [
      "Established 3 community tourism projects",
      "Trained 50+ community members in tourism",
      "Preserved traditional Maasai stories and songs",
      "Winner of Cultural Tourism Award 2021",
    ],
    availability: "Available year-round",
    maxGroupSize: 12,
    specialDestinations: ["Ngorongoro", "Maasai Villages", "Olduvai Gorge", "Lake Manyara"],
  },
  "lisa-njoroge": {
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
    longBio:
      "Lisa's passion for photography began in childhood, but it was her first safari that ignited her love for wildlife photography. After studying Fine Arts and Photography, she spent years perfecting her craft in the field.\n\nHer work has been featured in numerous international publications, and she now shares her expertise with safari guests. Lisa's photography tours are designed to help both amateur and experienced photographers capture stunning wildlife images while learning about composition, lighting, and animal behavior.",
    expertise: ["Wildlife Photography", "Landscape Photography", "Photo Editing", "Camera Techniques", "Composition"],
    certifications: [
      "Professional Photography Diploma",
      "Adobe Certified Expert",
      "Safari Guide Level II",
      "Photography Workshop Instructor",
    ],
    achievements: [
      "Published in National Geographic 5 times",
      "Won 3 international photography awards",
      "Conducted 200+ photography workshops",
      "Mentored 15 professional photographers",
    ],
    availability: "Available year-round, best during golden hours",
    maxGroupSize: 4,
    specialDestinations: ["Maasai Mara", "Amboseli", "Samburu", "Laikipia"],
  },
}

export default function TourGuidePage({ params }: { params: { id: string } }) {
  const guide = tourGuides[params.id]

  if (!guide) {
    notFound()
  }

  async function addGuideToCart() {
    "use server"
    await addToCart(`guide-${guide.id}`)
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4 group bg-transparent" asChild>
            <Link href="/tour-guides">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Tour Guides
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">{guide.name}</h1>
                    <Badge className="mt-2 bg-primary hover:bg-primary/90">{guide.specialty}</Badge>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span>{guide.location}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{guide.rating}</span>
                    <span className="text-muted-foreground ml-1">({guide.reviews} reviews)</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center">
                    <Languages className="h-4 w-4 text-primary mr-2" />
                    <span>{guide.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-primary mr-2" />
                    <span>{guide.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    <span>Max {guide.maxGroupSize} people</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <span>{guide.availability}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{guide.bio}</p>

                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">${guide.price}</p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>
                    <form action={addGuideToCart}>
                      <Button size="lg" className="group relative overflow-hidden" type="submit">
                        <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative">Book This Guide</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <Image src={guide.image || "/placeholder.svg"} alt={guide.name} fill className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <ScrollReveal>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {guide.name}</h2>
                <p className="whitespace-pre-line text-muted-foreground mb-6">{guide.longBio}</p>

                <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
                <div className="grid gap-2 mb-6">
                  {guide.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="grid gap-2">
                  {guide.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Key Achievements</h3>
                  <div className="space-y-3">
                    {guide.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Specialty Destinations</h3>
                  <div className="grid gap-2">
                    {guide.specialDestinations.map((destination, index) => (
                      <div key={index} className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span>{destination}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Booking Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Rate:</span>
                      <span className="font-bold">${guide.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Group Size:</span>
                      <span>{guide.maxGroupSize} people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span>{guide.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Languages:</span>
                      <span>{guide.languages.join(", ")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  )
}
