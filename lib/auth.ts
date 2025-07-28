"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Types
interface User {
  id: string
  name: string
  email: string
}

interface SignUpData {
  name: string
  email: string
  password: string
}

interface SignInData {
  email: string
  password: string
}

// Mock user database (in a real app, this would be a database)
const USERS: Record<string, User & { password: string }> = {
  "1": {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
}

// Helper to simulate database operations
const findUserByEmail = (email: string) => {
  return Object.values(USERS).find((user) => user.email === email)
}

// Sign up function
export async function signUp(data: SignUpData): Promise<void> {
  // Validate data
  if (!data.name || !data.email || !data.password) {
    throw new Error("All fields are required")
  }

  // Check if user already exists
  const existingUser = findUserByEmail(data.email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // In a real app, you would hash the password and store in a database
  const userId = Math.random().toString(36).substring(2, 10)

  // Create new user
  USERS[userId] = {
    id: userId,
    name: data.name,
    email: data.email,
    password: data.password, // In a real app, this would be hashed
  }

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// Sign in function
export async function signIn(data: SignInData): Promise<void> {
  // Validate data
  if (!data.email || !data.password) {
    throw new Error("Email and password are required")
  }

  // Find user
  const user = findUserByEmail(data.email)
  if (!user || user.password !== data.password) {
    throw new Error("Invalid email or password")
  }

  // Set auth cookie (in a real app, this would be a JWT or session token)
  cookies().set("auth", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

// Sign out function
export async function signOut(): Promise<void> {
  cookies().delete("auth")
  redirect("/")
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const userId = cookies().get("auth")?.value

  if (!userId || !USERS[userId]) {
    return null
  }

  const { password, ...user } = USERS[userId]
  return user
}

// Check if user is authenticated
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/sign-in")
  }

  return user
}
