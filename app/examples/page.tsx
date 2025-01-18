import { ExampleSelector } from "@/components/example-selector"
import { Waitlist } from "@/components/waitlist"
import { readFileSync, readdirSync } from "fs"
import path from "path"

function getExamples() {
  const examplesDir = path.join(process.cwd(), "examples/results")
  const files = readdirSync(examplesDir)
  
  const examples = files.reduce((acc, file) => {
    if (!file.endsWith(".json")) return acc
    
    const content = readFileSync(path.join(examplesDir, file), "utf-8")
    const key = path.basename(file, ".json")
    acc[key] = JSON.parse(content)
    return acc
  }, {} as Record<string, any>)

  return examples
}

export default function ExamplesPage() {
  const examples = getExamples()

  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="container max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Company Analysis Examples</h1>
        <ExampleSelector examples={examples} />
        <Waitlist />
      </div>
    </div>
  )
} 