import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { OurStory } from "@/components/our-story"
import { Waitlist } from "@/components/waitlist"

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <OurStory />
      <Waitlist />
    </main>
  )
}