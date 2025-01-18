import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { TargetUsers } from "@/components/target-users"
import { Waitlist } from "@/components/waitlist"

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <TargetUsers />
      <Waitlist />
    </main>
  )
}