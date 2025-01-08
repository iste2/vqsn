import { Users, TrendingUp, LineChart } from "lucide-react"

interface TargetUserItemProps {
  icon: React.ReactNode
  text: string
}

function TargetUserItem({ icon, text }: TargetUserItemProps) {
  return (
    <div className="flex items-start gap-4 p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  )
}

export function TargetUsers() {
  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
        Who is VQSN for?
      </h2>
      
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col items-center">
          <TargetUserItem 
            icon={<Users className="h-6 w-6" />}
            text="Investors who prioritize business fundamentals over speculation."
          />
          <TargetUserItem 
            icon={<TrendingUp className="h-6 w-6" />}
            text="Those who believe in long-term growth and solid companies."
          />
          <TargetUserItem 
            icon={<LineChart className="h-6 w-6" />}
            text="Anyone ready to streamline research and portfolio management."
          />
        </div>
        
        <p className="mt-8 text-center text-lg text-muted-foreground">
          If this sounds like you, VQSN was built to help you succeed.
        </p>
      </div>
    </section>
  )
} 