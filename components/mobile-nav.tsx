"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/destinations"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Destinations
          </Link>
          <Link
            href="#cars"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Car Rentals
          </Link>
          <Link
            href="#accommodations"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Accommodations
          </Link>
          <Link
            href="#wildlife"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Wildlife
          </Link>
          <Link
            href="/cart"
            className="text-lg font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)} asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button className="w-full" onClick={() => setOpen(false)} asChild>
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
