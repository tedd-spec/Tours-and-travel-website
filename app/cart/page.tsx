import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { cookies } from "next/headers"
import { removeFromCart, updateCartItemQuantity, addToCart, type Cart, type CartItem } from "@/lib/cart"

export default async function CartPage({
  searchParams,
}: {
  searchParams: { add?: string }
}) {
  // Add item to cart if specified in query params
  if (searchParams.add) {
    await addToCart(searchParams.add)
    redirect("/cart")
  }

  // Get cart from cookies
  const cartCookie = cookies().get("cart")?.value
  const cart: Cart = cartCookie ? JSON.parse(cartCookie) : { items: [], total: 0 }

  // Remove item from cart
  async function handleRemoveItem(productId: string) {
    "use server"
    await removeFromCart(productId)
  }

  // Update item quantity
  async function handleUpdateQuantity(productId: string, quantity: number) {
    "use server"
    await updateCartItemQuantity(productId, quantity)
  }

  return (
    <PageTransition>
      <div className="container py-12 md:py-24">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your Cart</h1>
            <p className="mt-4 text-xl text-muted-foreground">Review your selected items before checkout</p>
          </div>
        </ScrollReveal>

        {cart.items.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ScrollReveal>
                <div className="space-y-4">
                  {cart.items.map((item: CartItem) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-3 md:grid-cols-4">
                          <div className="relative h-32 md:h-40">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="col-span-2 md:col-span-3 p-4 flex flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                                {item.startDate && item.endDate && (
                                  <p className="text-sm mt-1">
                                    {item.startDate} - {item.endDate}
                                  </p>
                                )}
                              </div>
                              <p className="font-bold">${item.price * item.quantity}</p>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center">
                                <form action={handleUpdateQuantity.bind(null, item.id, item.quantity - 1)}>
                                  <Button variant="outline" size="icon" className="h-8 w-8" type="submit">
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">Decrease quantity</span>
                                  </Button>
                                </form>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <form action={handleUpdateQuantity.bind(null, item.id, item.quantity + 1)}>
                                  <Button variant="outline" size="icon" className="h-8 w-8" type="submit">
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">Increase quantity</span>
                                  </Button>
                                </form>
                              </div>

                              <form action={handleRemoveItem.bind(null, item.id)}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  type="submit"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal delay={0.2}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

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

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="promo" className="text-sm font-medium">
                          Promo Code
                        </label>
                        <div className="flex gap-2">
                          <Input id="promo" placeholder="Enter code" />
                          <Button variant="outline">Apply</Button>
                        </div>
                      </div>

                      <Button className="w-full group relative overflow-hidden" asChild>
                        <Link href="/checkout">
                          <span className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                          <span className="relative flex items-center justify-center">
                            Proceed to Checkout{" "}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </Button>

                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/destinations">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
