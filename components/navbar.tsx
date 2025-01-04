"use client"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <div className="text-xl font-semibold tracking-tight">
          ValueSeeker
        </div>
        <Button variant="default" size="default">
          Join Waitlist
        </Button>
      </div>
    </nav>
  )
} 