import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { TargetUsers } from "@/components/target-users"
import { Waitlist } from "@/components/waitlist"

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <TargetUsers />
      <Waitlist />
    </main>
  )
}