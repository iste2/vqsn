import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Search,
  LineChart,
  BarChart4
} from "lucide-react"

interface WorkflowStepProps {
  icon: React.ReactNode
  title: string
  description: string
}

function WorkflowStep({ icon, title, description }: WorkflowStepProps) {
  return (
    <div className="flex gap-4 items-start max-w-md mx-auto">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section className="container max-w-5xl mx-auto py-24 space-y-16">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">About VQSN</h2>
        <p className="max-w-[85ch] mx-auto text-muted-foreground">
          Investing in the stock market should be driven by quality insights and sound analysis, 
          not fleeting trends or technical charts. At VQSN, we revolutionize how investors 
          approach the market by providing a comprehensive, AI-powered tool tailored for quality 
          and value investors.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Our platform offers two core features:</h3>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          <AccordionItem value="analysis">
            <AccordionTrigger className="text-xl font-semibold">
              Advanced Stock Analysis
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              VQSN performs in-depth analyses of all listed stocks, focusing on the fundamentals 
              that matter most. Our quality analysis evaluates critical factors like market position, 
              business model, and management competence. Simultaneously, our fundamental analysis 
              dives deep into financial reports, employing models such as discounted cash flow (DCF) 
              to determine a stock&apos;s intrinsic value.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="portfolio">
            <AccordionTrigger className="text-xl font-semibold">
              Smart Portfolio Management
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              With VQSN, you can seamlessly create and manage portfolios. Using principles from 
              Modern Portfolio Theory, our tool optimizes your portfolio for maximum efficiency, 
              balancing risk and return with precision.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-semibold text-center">Streamlined Workflow for Investors:</h3>
        <div className="space-y-8">
          <WorkflowStep
            icon={<Search className="w-5 h-5" />}
            title="Discover and Analyze"
            description="Receive tailored stock suggestions or screen stocks manually to find opportunities that align with your strategy."
          />
          <WorkflowStep
            icon={<LineChart className="w-5 h-5" />}
            title="Track and Stay Updated"
            description="Add stocks to your watchlist to receive real-time updates on changes in their analysis."
          />
          <WorkflowStep
            icon={<BarChart4 className="w-5 h-5" />}
            title="Build and Optimize Portfolios"
            description="Select stocks, build portfolios, and let VQSN ensure optimal performance through automated balancing."
          />
        </div>
      </div>

      <p className="text-center text-lg max-w-3xl mx-auto">
        VQSN is the essential companion for investors who prioritize deep research and strategic investment. 
        Forget trends—focus on true business value with VQSN.
      </p>
    </section>
  )
} 