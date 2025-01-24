import { BarChart3, Wallet } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const features: Feature[] = [
  {
    title: "Comprehensive Stock Analysis",
    description: "Our AI evaluates market position, business models, and performs detailed fundamental analysis. Get deeper insights into stock quality and true value.",
    icon: BarChart3,
  },
  {
    title: "Smart Portfolio Management",
    description: "Build and optimize your portfolio. Our system automatically balances your investments for the optimal risk-return ratio.",
    icon: Wallet,
  },
]

export function Features() {
  return (
    <div className="w-full flex justify-center bg-background">
      <section className="container py-24 flex flex-col items-center max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for smart investing
          </p>
        </div>
        <ul className="w-full max-w-3xl space-y-8">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="flex items-start gap-6 p-6 bg-card rounded-lg border"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
} 