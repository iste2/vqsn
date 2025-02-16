"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export function Hero() {

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Smart Investing with AI</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            TrueStockInsight analyzes stocks and helps build your perfect portfolio. All in one place.
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button 
          variant="outline"
          className="h-12 px-8 text-base font-medium"
          asChild
        >
          <Link href="/examples">View Examples</Link>
        </Button>
        <Button 
          className="h-12 px-8 text-base font-medium"
          onClick={() => {
            const waitlistSection = document.querySelector('#waitlist')
            waitlistSection?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Join Waitlist
        </Button>
      </div>
    </div>
  )
} 