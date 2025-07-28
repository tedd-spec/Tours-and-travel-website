import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurrentUser, signOut } from "@/lib/auth"
import { ScrollReveal } from "@/components/scroll-reveal"
import { LogOut, User, Calendar, MapPin, Clock } from "lucide-react"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  // Mock booking history (in a real app, this would come from a database)
  const bookings = [
    {
      id: "B12345",
      type: "Tour",
      destination: "Serengeti National Park",
      date: "June 15, 2023",
      status: "Completed",
      image: "/images/serengeti.jpg",
    },
    {
      id: "B67890",
      type: "Accommodation",
      destination: "Luxury Safari Lodge",
      date: "August 22, 2023",
      status: "Upcoming",
      image: "/images/luxury-lodge.jpg",
    },
  ]

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-1/3">
            <ScrollReveal>
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>

                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile/edit">Edit Profile</Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile/bookings">My Bookings</Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile/wishlist">Wishlist</Link>
                    </Button>
                    <form action={signOut}>
                      <Button variant="destructive" className="w-full" type="submit">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <div className="w-full md:w-2/3">
            <ScrollReveal delay={0.2}>
              <Tabs defaultValue="bookings">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bookings">Booking History</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                </TabsList>

                <TabsContent value="bookings" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Your Booking History</h2>

                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="relative h-40 md:h-auto">
                              <Image
                                src={booking.image || "/placeholder.svg"}
                                alt={booking.destination}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-6 md:col-span-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold">{booking.destination}</h3>
                                  <p className="text-sm text-muted-foreground">{booking.type}</p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs ${
                                    booking.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </div>

                              <div className="mt-4 space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>{booking.destination}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span>Booking ID: {booking.id}</span>
                                </div>
                              </div>

                              <div className="mt-6">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/bookings/${booking.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
                      <Button asChild>
                        <Link href="/destinations">Explore Destinations</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upcoming" className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Your Upcoming Trips</h2>

                  {bookings.filter((b) => b.status === "Upcoming").length > 0 ? (
                    <div className="space-y-4">
                      {bookings
                        .filter((b) => b.status === "Upcoming")
                        .map((booking) => (
                          <Card key={booking.id} className="overflow-hidden">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="relative h-40 md:h-auto">
                                <Image
                                  src={booking.image || "/placeholder.svg"}
                                  alt={booking.destination}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-6 md:col-span-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-bold">{booking.destination}</h3>
                                    <p className="text-sm text-muted-foreground">{booking.type}</p>
                                  </div>
                                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                    {booking.status}
                                  </span>
                                </div>

                                <div className="mt-4 space-y-2">
                                  <div className="flex items-center text-sm">
                                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{booking.date}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>{booking.destination}</span>
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span>Booking ID: {booking.id}</span>
                                  </div>
                                </div>

                                <div className="mt-6 flex gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/bookings/${booking.id}`}>View Details</Link>
                                  </Button>
                                  <Button variant="destructive" size="sm">
                                    Cancel Booking
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">You don't have any upcoming trips.</p>
                      <Button asChild>
                        <Link href="/destinations">Plan Your Next Adventure</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
