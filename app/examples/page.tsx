import { Navbar } from "@/components/navbar"
import { ExampleSelector } from "@/components/example-selector"

export default function ExamplesPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Examples</h1>
        <div className="max-w-xl">
          <ExampleSelector />
        </div>
      </div>
    </>
  )
} 