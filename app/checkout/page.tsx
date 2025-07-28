import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react"
import { cookies } from "next/headers"
import { processCheckout, type Cart } from "@/lib/cart"
import { getCurrentUser } from "@/lib/auth"

export default async function CheckoutPage() {
  // Get cart from cookies
  const cartCookie = cookies().get("cart")?.value
  const cart: Cart = cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }

  // Redirect to cart if empty
  if (cart.items.length === 0) {
    redirect("/cart")
  }

  // Get current user
  const user = await getCurrentUser()

  // Process checkout
  async function handleCheckout(formData: FormData) {
    "use server"

    const paymentDetails = {
      cardName: formData.get("cardName"),
      cardNumber: formData.get("cardNumber"),
      expiryDate: formData.get("expiryDate"),
      cvv: formData.get("cvv"),
      billingAddress: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        address: formData.get("address"),
        city: formData.get("city"),
        country: formData.get("country"),
        postalCode: formData.get("postalCode"),
      },
    }

    try {
      const orderId = await processCheckout(paymentDetails)
      redirect(`/booking-confirmation?orderId=${orderId}`)
    } catch (error) {
      console.error("Checkout error:", error)
      // In a real app, you would handle this error properly
      redirect("/checkout?error=true")
    }
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Checkout</h1>
            <p className="mt-4 text-xl text-muted-foreground">Complete your booking by providing payment details</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ScrollReveal>
              <form action={handleCheckout}>
                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4">Contact Information</h2>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            defaultValue={user?.name?.split(" ")[0] || ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            defaultValue={user?.name?.split(" ")[1] || ""}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" required defaultValue={user?.email || ""} />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" name="address" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input id="postalCode" name="postalCode" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="country">Country</Label>
                          <Select name="country" required defaultValue="US">
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                              <SelectItem value="DE">Germany</SelectItem>
                              <SelectItem value="FR">France</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Payment Details</h2>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          Secure Payment
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" name="cardName" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                            <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" name="cvv" placeholder="123" required />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" name="terms" required />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          By checking this box, you agree to our{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" className="sm:order-1" asChild>
                        <Link href="/cart">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Cart
                        </Link>
                      </Button>
                      <Button type="submit" className="sm:flex-1 group relative overflow-hidden">
                        <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative">Complete Booking</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.2}>
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      {cart.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="relative w-12 h-12 rounded overflow-hidden mr-3">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} x ${item.price}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">${item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes</span>
                        <span>${(cart.total * 0.1).toFixed(2)}</span>
                      </div>
                      {cart.total >= 1000 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (10%)</span>
                          <span>-${(cart.total * 0.1).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          $
                          {cart.total >= 1000
                            ? (cart.total + cart.total * 0.1 - cart.total * 0.1).toFixed(2)
                            : (cart.total + cart.total * 0.1).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
