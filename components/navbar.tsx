"use client"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-6 w-6 rotate-180"
            viewBox="0 0 1740 1510"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="currentColor">
              <path d="M763 1333 c-55 -98 -129 -226 -163 -285 l-62 -106 47 -81 c26 -45 50 -81 55 -81 4 0 56 86 116 190 59 105 111 190 114 190 3 0 155 -261 339 -580 l333 -580 92 0 c51 0 95 2 98 5 3 3 -143 263 -324 578 -182 315 -376 652 -431 750 -56 97 -104 177 -107 177 -3 0 -51 -80 -107 -177z" />
              <path d="M803 659 c-26 -46 -47 -88 -45 -94 2 -5 50 -91 108 -191 57 -99 104 -184 104 -188 0 -3 -62 -5 -137 -4 l-137 3 -146 252 c-80 139 -148 253 -151 253 -9 0 -397 -679 -391 -685 3 -3 90 -5 194 -5 144 0 188 3 188 13 -1 6 -21 46 -45 87 l-44 75 44 80 c24 43 47 81 52 82 5 2 52 -72 104 -164 l96 -168 337 -3 c228 -1 336 1 336 8 0 10 -374 668 -406 714 -11 16 -17 10 -61 -65z" />
            </g>
          </svg>
          <span className="text-xl font-semibold tracking-tight">
            ValueSeeker
          </span>
        </div>
        <Button 
          variant="default" 
          size="default"
          onClick={handleWaitlistClick}
        >
          Join Waitlist
        </Button>
      </div>
    </nav>
  )
} 