import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { OurStory } from "@/components/our-story"
import { Waitlist } from "@/components/waitlist"
import { HeroImage } from "@/components/hero-image"

export default function Page() {
  return (
    <main>
      <Hero />
      <HeroImage />
      <Features />
      <OurStory />
      <Waitlist />
    </main>
  )
}