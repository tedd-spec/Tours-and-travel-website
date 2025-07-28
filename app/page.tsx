import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  MapPin,
  Mountain,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedImage } from "@/components/animated-image"
import { HeroAnimation } from "@/components/hero-animation"
import { MobileNav } from "@/components/mobile-nav"
import { BookingForms } from "@/components/booking-forms"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Bania Tours</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/destinations"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Destinations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/tour-guides"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Tour Guides
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="#cars" className="text-sm font-medium transition-colors hover:text-primary relative group">
                Car Rentals
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#accommodations"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Accommodations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="#wildlife"
                className="text-sm font-medium transition-colors hover:text-primary relative group"
              >
                Wildlife
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" className="hidden md:flex" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Link>
              </Button>
              <MobileNav />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="relative overflow-hidden bg-muted py-20 md:py-32">
            <div className="container relative z-10 flex flex-col items-center text-center">
              <ScrollReveal>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Discover the Beauty of <span className="text-primary">Wildlife</span> and Nature
                </h1>
                <p className="mt-6 max-w-2xl text-muted-foreground md:text-xl">
                  Experience unforgettable adventures with Bania Tours and Travel. Book cars, accommodations, and guided
                  tours to explore the wonders of nature.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="group relative overflow-hidden" asChild>
                    <Link href="/destinations">
                      <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative flex items-center">
                        Explore Destinations{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group bg-transparent">
                    <span className="relative flex items-center">
                      View Special Offers{" "}
                      <span className="ml-2 text-primary transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <HeroAnimation />
          </section>

          <section className="container py-12 md:py-24">
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Plan Your Perfect Journey</h2>
                <p className="mt-4 text-muted-foreground">
                  Book your transportation, accommodations, and experiences all in one place.
                </p>
              </div>
            </ScrollReveal>

            <div className="mx-auto max-w-4xl rounded-xl border bg-card p-4 shadow-sm md:p-8">
              <BookingForms />
            </div>
          </section>

          <section id="destinations" className="bg-muted/50 py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Wildlife Destinations</h2>
                  <p className="mt-4 text-muted-foreground">
                    Explore breathtaking locations and encounter magnificent wildlife in their natural habitats.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatedImage>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/serengeti.jpg"
                        alt="Serengeti National Park"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Serengeti National Park</h3>
                      <p className="mt-2 text-muted-foreground">
                        Home to the great migration, with millions of wildebeest, zebra, and gazelle.
                      </p>
                      <Button variant="outline" className="mt-4 group relative overflow-hidden bg-transparent" asChild>
                        <Link href={`/destinations/serengeti`}>
                          <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative flex items-center">
                            View Details{" "}
                            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.2}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/maasai-mara.jpg"
                        alt="Maasai Mara Reserve"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Maasai Mara Reserve</h3>
                      <p className="mt-2 text-muted-foreground">
                        Famous for its exceptional population of big cats and the annual wildebeest migration.
                      </p>
                      <Button variant="outline" className="mt-4 group relative overflow-hidden bg-transparent" asChild>
                        <Link href={`/destinations/maasai-mara`}>
                          <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative flex items-center">
                            View Details{" "}
                            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.4}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/kruger.jpg"
                        alt="Kruger National Park"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Kruger National Park</h3>
                      <p className="mt-2 text-muted-foreground">
                        One of Africa's largest game reserves, home to the Big Five and hundreds of other species.
                      </p>
                      <Button variant="outline" className="mt-4 group relative overflow-hidden bg-transparent" asChild>
                        <Link href={`/destinations/kruger`}>
                          <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative flex items-center">
                            View Details{" "}
                            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>
              </div>
            </div>
          </section>

          <section id="tour-guides" className="py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Expert Tour Guides</h2>
                  <p className="mt-4 text-muted-foreground">
                    Our professional guides have extensive knowledge of local wildlife, culture, and history
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatedImage>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/guide-1.png"
                        alt="James Kimathi"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">James Kimathi</h3>
                      <p className="text-sm text-primary font-medium">Wildlife Expert</p>
                      <p className="mt-2 text-muted-foreground text-sm">
                        15+ years experience in Serengeti and Maasai Mara. Specializes in big cat tracking.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $120<span className="text-sm font-normal text-muted-foreground">/day</span>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group relative overflow-hidden bg-transparent"
                          asChild
                        >
                          <Link href={`/tour-guides/james-kimathi`}>
                            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center">Profile</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.1}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/guide-2.png"
                        alt="Sarah Omondi"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Sarah Omondi</h3>
                      <p className="text-sm text-primary font-medium">Bird Specialist</p>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Ornithologist with knowledge of over 500 bird species. Expert in bird photography.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $110<span className="text-sm font-normal text-muted-foreground">/day</span>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group relative overflow-hidden bg-transparent"
                          asChild
                        >
                          <Link href={`/tour-guides/sarah-omondi`}>
                            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center">Profile</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.2}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/guide-3.png"
                        alt="Daniel Mwangi"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Daniel Mwangi</h3>
                      <p className="text-sm text-primary font-medium">Cultural Expert</p>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Maasai heritage specialist with deep knowledge of local traditions and customs.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $100<span className="text-sm font-normal text-muted-foreground">/day</span>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group relative overflow-hidden bg-transparent"
                          asChild
                        >
                          <Link href={`/tour-guides/daniel-mwangi`}>
                            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center">Profile</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.3}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src="/images/guide-4.png"
                        alt="Lisa Njoroge"
                        width={400}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Lisa Njoroge</h3>
                      <p className="text-sm text-primary font-medium">Photography Guide</p>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Professional wildlife photographer who helps guests capture perfect safari moments.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $130<span className="text-sm font-normal text-muted-foreground">/day</span>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group relative overflow-hidden bg-transparent"
                          asChild
                        >
                          <Link href={`/tour-guides/lisa-njoroge`}>
                            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center">Profile</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>
              </div>

              <div className="mt-8 text-center">
                <Button className="group relative overflow-hidden" asChild>
                  <Link href="/tour-guides">
                    <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center">
                      View All Tour Guides
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="wildlife" className="bg-muted/50 py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Rich History of Wildlife</h2>
                  <p className="mt-4 text-muted-foreground">
                    Learn about the fascinating evolution and conservation of wildlife across our destinations.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid gap-12 md:grid-cols-2">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">The Great Migration</h3>
                    <p className="text-muted-foreground">
                      The Great Migration is one of the most remarkable wildlife spectacles on Earth. Each year, over
                      1.5 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, make a
                      circular journey through the Serengeti-Mara ecosystem in search of fresh grazing and water.
                    </p>
                    <p className="text-muted-foreground">
                      This natural phenomenon has occurred for thousands of years, shaped by the seasonal rains and the
                      animals' instinctual knowledge of where to find resources. The migration route spans approximately
                      1,800 miles and involves crossing dangerous rivers where crocodiles await.
                    </p>
                    <Button className="group relative overflow-hidden">
                      <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative">Learn More About Migration</span>
                    </Button>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/migration.jpg"
                      alt="The Great Migration"
                      width={600}
                      height={500}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>
              </div>

              <div className="mt-16 grid gap-12 md:grid-cols-2">
                <ScrollReveal direction="left">
                  <div className="order-2 md:order-1 relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/conservation.jpg"
                      alt="Conservation Efforts"
                      width={600}
                      height={500}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div className="order-1 md:order-2 space-y-6">
                    <h3 className="text-2xl font-bold">Conservation Efforts</h3>
                    <p className="text-muted-foreground">
                      Wildlife conservation in Africa has a complex history. Traditional conservation practices by
                      indigenous communities existed for centuries before colonial-era game reserves were established in
                      the early 20th century.
                    </p>
                    <p className="text-muted-foreground">
                      Modern conservation efforts focus on community-based approaches that benefit both wildlife and
                      local people. These initiatives have helped recover populations of endangered species like the
                      black rhino and mountain gorilla, while supporting sustainable tourism that funds further
                      protection.
                    </p>
                    <Button className="group relative overflow-hidden">
                      <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative">Support Conservation</span>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <section id="cars" className="py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Fleet of Safari Vehicles</h2>
                  <p className="mt-4 text-muted-foreground">
                    Choose from our range of specially equipped vehicles for your wildlife adventure.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatedImage>
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/images/safari-jeep.jpg"
                        alt="Safari Jeep"
                        width={300}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold">Safari Jeep</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Open-top 4x4 vehicles perfect for game viewing
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $120 <span className="text-sm font-normal text-muted-foreground">per day</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Up to 4 people</p>
                      </div>
                      <Button size="sm" className="mt-4 w-full group relative overflow-hidden" asChild>
                        <Link href="/car-booking?vehicle=safari-jeep">
                          <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative">Book Now</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.1}>
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/images/land-cruiser.jpg"
                        alt="Land Cruiser"
                        width={300}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold">Land Cruiser</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Comfortable 4x4 with pop-up roof for photography
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $150 <span className="text-sm font-normal text-muted-foreground">per day</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Up to 6 people</p>
                      </div>
                      <Button size="sm" className="mt-4 w-full group relative overflow-hidden" asChild>
                        <Link href="/car-booking?vehicle=land-cruiser">
                          <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative">Book Now</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.2}>
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/images/safari-van.jpg"
                        alt="Safari Van"
                        width={300}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold">Safari Van</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Spacious vehicle with sliding windows for groups
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $180 <span className="text-sm font-normal text-muted-foreground">per day</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Up to 8 people</p>
                      </div>
                      <Button size="sm" className="mt-4 w-full group relative overflow-hidden" asChild>
                        <Link href="/car-booking?vehicle=safari-van">
                          <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative">Book Now</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.3}>
                  <Card className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/images/luxury-suv.jpg"
                        alt="Luxury SUV"
                        width={300}
                        height={192}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold">Luxury SUV</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Premium vehicle with AC and enhanced comfort</p>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-bold">
                          $220 <span className="text-sm font-normal text-muted-foreground">per day</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Up to 4 people</p>
                      </div>
                      <Button size="sm" className="mt-4 w-full group relative overflow-hidden" asChild>
                        <Link href="/car-booking?vehicle=luxury-suv">
                          <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative">Book Now</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedImage>
              </div>
            </div>
          </section>

          <section id="accommodations" className="bg-muted/50 py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Accommodations</h2>
                  <p className="mt-4 text-muted-foreground">
                    From luxury lodges to authentic tented camps, find the perfect place to stay during your safari.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatedImage>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src="/images/luxury-lodge.jpg"
                        alt="Luxury Safari Lodge"
                        width={400}
                        height={256}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">From $350 per night</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Luxury Safari Lodge</h3>
                      <p className="mt-2 text-muted-foreground">
                        Elegant accommodations with private viewing decks and gourmet dining.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" className="group bg-transparent">
                          <span className="relative flex items-center">
                            View Details{" "}
                            <span className="ml-1 text-primary transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </Button>
                        <Button size="sm" className="group relative overflow-hidden" asChild>
                          <Link href="/cart?add=luxury-lodge">
                            <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative">Add to Cart</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.2}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src="/images/tented-camp.jpg"
                        alt="Tented Safari Camp"
                        width={400}
                        height={256}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">From $220 per night</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Tented Safari Camp</h3>
                      <p className="mt-2 text-muted-foreground">
                        Authentic canvas tents with comfortable furnishings and en-suite bathrooms.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" className="group bg-transparent">
                          <span className="relative flex items-center">
                            View Details{" "}
                            <span className="ml-1 text-primary transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </Button>
                        <Button size="sm" className="group relative overflow-hidden" asChild>
                          <Link href="/cart?add=tented-camp">
                            <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative">Add to Cart</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>

                <AnimatedImage delay={0.4}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src="/images/eco-lodge.jpg"
                        alt="Eco-Friendly Lodge"
                        width={400}
                        height={256}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform">
                        <p className="font-bold">From $280 per night</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Eco-Friendly Lodge</h3>
                      <p className="mt-2 text-muted-foreground">
                        Sustainable accommodations that blend with the natural environment.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm" className="group bg-transparent">
                          <span className="relative flex items-center">
                            View Details{" "}
                            <span className="ml-1 text-primary transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </Button>
                        <Button size="sm" className="group relative overflow-hidden" asChild>
                          <Link href="/cart?add=eco-lodge">
                            <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative">Add to Cart</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedImage>
              </div>
            </div>
          </section>

          <section className="bg-primary text-primary-foreground py-12 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
            <div className="container relative z-10">
              <div className="grid gap-8 md:grid-cols-4">
                <div className="text-center">
                  <AnimatedCounter value={25} duration={2} />
                  <h3 className="mt-2 text-xl font-bold">Years Experience</h3>
                </div>
                <div className="text-center">
                  <AnimatedCounter value={150} duration={2} />
                  <h3 className="mt-2 text-xl font-bold">Safari Destinations</h3>
                </div>
                <div className="text-center">
                  <AnimatedCounter value={10000} suffix="+" duration={2} />
                  <h3 className="mt-2 text-xl font-bold">Happy Travelers</h3>
                </div>
                <div className="text-center">
                  <AnimatedCounter value={98} suffix="%" duration={2} />
                  <h3 className="mt-2 text-xl font-bold">Satisfaction Rate</h3>
                </div>
              </div>
            </div>
          </section>

          <Testimonials />

          <section className="py-12 md:py-24">
            <div className="container">
              <ScrollReveal>
                <div className="mx-auto mb-12 max-w-3xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready for Your Wildlife Adventure?</h2>
                  <p className="mt-4 text-muted-foreground">Contact our team to plan your perfect safari experience.</p>
                </div>
              </ScrollReveal>

              <div className="mx-auto max-w-lg rounded-xl border bg-card p-6 shadow-sm md:p-8">
                <form className="space-y-6" action="/api/contact" method="POST">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" name="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" name="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" placeholder="Enter your email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">I'm interested in</Label>
                    <Select name="interest" required>
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Car Rental</SelectItem>
                        <SelectItem value="accommodation">Accommodation</SelectItem>
                        <SelectItem value="safari">Safari Tour</SelectItem>
                        <SelectItem value="package">Complete Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full group relative overflow-hidden">
                    <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center justify-center">
                      Send Inquiry{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t bg-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
          <div className="container py-8 md:py-12 relative z-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">Bania Tours</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Providing unforgettable wildlife experiences and adventures since 1998.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-primary">→</span> Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-primary">→</span> About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-primary">→</span> Destinations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-primary">→</span> Car Rentals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
                    >
                      <span className="mr-2 text-primary">→</span> Accommodations
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start group">
                    <MapPin className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      123 Safari Road, Nairobi, Kenya
                    </span>
                  </li>
                  <li className="flex items-start group">
                    <Mail className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      info@baniatours.com
                    </span>
                  </li>
                  <li className="flex items-start group">
                    <Phone className="mr-2 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      +254 123 456 789
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Subscribe to our newsletter for special offers and updates.
                </p>
                <form className="flex gap-2" action="/api/subscribe" method="POST">
                  <Input name="email" placeholder="Your email" className="max-w-[180px]" required />
                  <Button type="submit" size="sm" className="group relative overflow-hidden">
                    <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative">Subscribe</span>
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} Bania Tours and Travel. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >
                    <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="sr-only">YouTube</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
