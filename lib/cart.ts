"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// Types
export interface CartItem {
  id: string
  type: "car" | "accommodation" | "tour" | "guide"
  name: string
  price: number
  image: string
  quantity: number
  startDate?: string
  endDate?: string
  numberOfPeople?: number
  days?: number
  customName?: string
  guideSpecialty?: string
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Product catalog (in a real app, this would come from a database)
const PRODUCTS: Record<
  string,
  Omit<CartItem, "quantity" | "startDate" | "endDate" | "numberOfPeople" | "days" | "customName">
> = {
  "safari-jeep": {
    id: "safari-jeep",
    type: "car",
    name: "Safari Jeep",
    price: 120,
    image: "/images/safari-jeep.jpg",
  },
  "land-cruiser": {
    id: "land-cruiser",
    type: "car",
    name: "Land Cruiser",
    price: 150,
    image: "/images/land-cruiser.jpg",
  },
  "safari-van": {
    id: "safari-van",
    type: "car",
    name: "Safari Van",
    price: 180,
    image: "/images/safari-van.jpg",
  },
  "luxury-suv": {
    id: "luxury-suv",
    type: "car",
    name: "Luxury SUV",
    price: 220,
    image: "/images/luxury-suv.jpg",
  },
  "luxury-lodge": {
    id: "luxury-lodge",
    type: "accommodation",
    name: "Luxury Safari Lodge",
    price: 350,
    image: "/images/luxury-lodge.jpg",
  },
  "tented-camp": {
    id: "tented-camp",
    type: "accommodation",
    name: "Tented Safari Camp",
    price: 220,
    image: "/images/tented-camp.jpg",
  },
  "eco-lodge": {
    id: "eco-lodge",
    type: "accommodation",
    name: "Eco-Friendly Lodge",
    price: 280,
    image: "/images/eco-lodge.jpg",
  },
  "serengeti-tour": {
    id: "serengeti-tour",
    type: "tour",
    name: "Serengeti National Park Tour",
    price: 500,
    image: "/images/serengeti.jpg",
  },
  "maasai-mara-tour": {
    id: "maasai-mara-tour",
    type: "tour",
    name: "Maasai Mara Reserve Tour",
    price: 450,
    image: "/images/maasai-mara.jpg",
  },
  "kruger-tour": {
    id: "kruger-tour",
    type: "tour",
    name: "Kruger National Park Tour",
    price: 480,
    image: "/images/kruger.jpg",
  },
  // Tour Guides
  "guide-james-kimathi": {
    id: "guide-james-kimathi",
    type: "guide",
    name: "James Kimathi",
    price: 120,
    image: "/images/guide-1.png",
    guideSpecialty: "Wildlife Expert",
  },
  "guide-sarah-omondi": {
    id: "guide-sarah-omondi",
    type: "guide",
    name: "Sarah Omondi",
    price: 110,
    image: "/images/guide-2.png",
    guideSpecialty: "Bird Specialist",
  },
  "guide-daniel-mwangi": {
    id: "guide-daniel-mwangi",
    type: "guide",
    name: "Daniel Mwangi",
    price: 100,
    image: "/images/guide-3.png",
    guideSpecialty: "Cultural Expert",
  },
  "guide-lisa-njoroge": {
    id: "guide-lisa-njoroge",
    type: "guide",
    name: "Lisa Njoroge",
    price: 130,
    image: "/images/guide-4.png",
    guideSpecialty: "Photography Guide",
  },
}

// Helper to get cart from cookies
function getCart(): Cart {
  const cartCookie = cookies().get("cart")?.value

  if (!cartCookie) {
    return { items: [], total: 0 }
  }

  try {
    return JSON.parse(cartCookie)
  } catch (error) {
    return { items: [], total: 0 }
  }
}

// Helper to save cart to cookies
function saveCart(cart: Cart): void {
  cookies().set("cart", JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

// Add item to cart with enhanced functionality
export async function addToCart(
  productId: string,
  quantity = 1,
  startDate?: string,
  endDate?: string,
  customOptions?: {
    numberOfPeople?: number
    totalPrice?: number
    days?: number
    customName?: string
  },
): Promise<void> {
  const product = PRODUCTS[productId]

  if (!product) {
    throw new Error("Product not found")
  }

  const cart = getCart()
  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.id === productId &&
      item.startDate === startDate &&
      item.endDate === endDate &&
      item.numberOfPeople === customOptions?.numberOfPeople,
  )

  const finalPrice = customOptions?.totalPrice || product.price
  const displayName = customOptions?.customName || product.name

  if (existingItemIndex !== -1) {
    // Update existing item
    cart.items[existingItemIndex].quantity += quantity
    if (startDate) cart.items[existingItemIndex].startDate = startDate
    if (endDate) cart.items[existingItemIndex].endDate = endDate
    if (customOptions?.numberOfPeople) cart.items[existingItemIndex].numberOfPeople = customOptions.numberOfPeople
    if (customOptions?.days) cart.items[existingItemIndex].days = customOptions.days
    if (customOptions?.customName) cart.items[existingItemIndex].customName = customOptions.customName
    cart.items[existingItemIndex].price = finalPrice
  } else {
    // Add new item
    cart.items.push({
      ...product,
      name: displayName,
      price: finalPrice,
      quantity,
      startDate,
      endDate,
      numberOfPeople: customOptions?.numberOfPeople,
      days: customOptions?.days,
      customName: customOptions?.customName,
    })
  }

  // Recalculate total
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  saveCart(cart)
  revalidatePath("/cart")
}

// Remove item from cart
export async function removeFromCart(productId: string): Promise<void> {
  const cart = getCart()

  cart.items = cart.items.filter((item) => item.id !== productId)
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  saveCart(cart)
  revalidatePath("/cart")
}

// Update item quantity
export async function updateCartItemQuantity(productId: string, quantity: number): Promise<void> {
  if (quantity < 1) {
    return removeFromCart(productId)
  }

  const cart = getCart()
  const itemIndex = cart.items.findIndex((item) => item.id === productId)

  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity = quantity
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    saveCart(cart)
    revalidatePath("/cart")
  }
}

// Clear cart
export async function clearCart(): Promise<void> {
  cookies().delete("cart")
  revalidatePath("/cart")
}

// Get product by ID
export function getProduct(productId: string) {
  return PRODUCTS[productId] || null
}

// Process checkout
export async function processCheckout(paymentDetails: any): Promise<string> {
  const cart = getCart()

  if (cart.items.length === 0) {
    throw new Error("Your cart is empty")
  }

  // In a real app, you would process payment and create order in database

  // Generate order ID
  const orderId = Math.random().toString(36).substring(2, 10)

  // Clear cart after successful checkout
  await clearCart()

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return orderId
}

// Get cart summary for display
export function getCartSummary(cart: Cart) {
  const itemsByType = cart.items.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, CartItem[]>,
  )

  return {
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.total,
    itemsByType,
    hasGuides: cart.items.some((item) => item.type === "guide"),
    hasCars: cart.items.some((item) => item.type === "car"),
    hasAccommodations: cart.items.some((item) => item.type === "accommodation"),
    hasTours: cart.items.some((item) => item.type === "tour"),
  }
}
