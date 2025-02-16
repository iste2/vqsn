"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span className="text font-bold bg-primary text-secondary px-1 rounded text-center">
              TSI
            </span>
            <span className="text-xl font-semibold">
              TrueStockInsight
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <Link
              href="/examples"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View Examples
          </Link>
          <Button 
            variant="default" 
            size="default"
            onClick={handleWaitlistClick}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </nav>
  )
} 