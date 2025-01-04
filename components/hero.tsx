"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Hero() {
  const [email, setEmail] = useState("")

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Value
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          The AI-Powered Tool for Value and Quality Investors
        </p>
      </div>
      
      <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-base px-4"
        />
        <Button 
          className="h-12 px-8 text-base font-medium"
        >
          Join Waitlist
        </Button>
      </div>
    </div>
  )
} 