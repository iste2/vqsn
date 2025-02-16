"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export function Hero() {

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="block">Professional Company Analysis, Instantly</span>
        </h1>
        <p className="mx-auto max-w-[800px] text-lg text-muted-foreground sm:text-xl">
            TrueStockInsight combines AI-powered SEC filing analysis with traditional valuation methods to deliver comprehensive company research that helps you make confident investment decisions.
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