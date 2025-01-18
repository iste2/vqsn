import { Card } from "@/components/ui/card"

interface StoryEntry {
  title: string
  content: string
}

const storyEntries: StoryEntry[] = [
  {
    title: "The Problem",
    content: "Like many investors, I started by following expert advice without truly understanding the underlying principles. This led to poor investment decisions and frustrating results. The market is flooded with opinions, but lacking in tools that help investors develop deep understanding and make informed decisions based on solid analysis."
  },
  {
    title: "The Solution",
    content: "During my finance studies at university, I discovered the power of theoretical and scientific approaches to stock analysis and portfolio management. These proven methods opened my eyes to a better way of investing. VQSN combines these academic principles with advanced AI to make professional-grade analysis accessible to everyone."
  },
  {
    title: "My Vision",
    content: "I am building VQSN to be your complete investment companion - from discovering promising stocks and analyzing their true value, to building optimized portfolios based on scientific principles. My goal is to empower investors with the tools and insights they need to make confident, well-researched investment decisions."
  }
]

export function OurStory() {
  return (
    <section className="container py-24 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">The Story</h2>
        <p className="text-muted-foreground text-lg">Why I build VQSN</p>
      </div>

      <ul className="space-y-6 max-w-2xl mx-auto">
        {storyEntries.map((entry) => (
          <li key={entry.title}>
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold mb-2">{entry.title}</h3>
              <p className="text-muted-foreground">{entry.content}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
} 