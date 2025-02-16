import Image from "next/image";

export function Features() {
  return (
    <div className="w-full flex justify-center bg-background">
      <section className="container py-12 flex flex-col items-center max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for smart investing
          </p>
        </div>
        <Image src="/workflow.png" alt="workflow" width={1000} height={50} className="mb-14" />
        <p className="text-muted-foreground">
          The AI-powered workflow analyzes SEC filings to characterize business models and assess risks. The system evaluates financial data and applies traditional valuation methods, enhanced by AI support. The result: a comprehensive database of professional company analyses, available at your fingertips.
        </p>
      </section>
    </div>
  )
} 