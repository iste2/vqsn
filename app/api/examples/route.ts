import { readFileSync, readdirSync } from "fs"
import path from "path"
import { NextResponse } from "next/server"
import type Example from "@/app/examples/interfaces"

function getExamples() {
  const examplesDir = path.join(process.cwd(), "examples/results")
  const files = readdirSync(examplesDir)
  
  const examples = files.reduce((acc, file) => {
    if (!file.endsWith(".json")) return acc
    
    const content = readFileSync(path.join(examplesDir, file), "utf-8")
    const key = path.basename(file, ".json")
    acc[key] = JSON.parse(content)
    return acc
  }, {} as Record<string, Example>)

  return examples
}

export async function GET() {
  try {
    const examples = getExamples()
    return NextResponse.json(examples)
  } catch (error) {
    console.error('Error fetching examples:', error)
    return NextResponse.json(
      { error: 'Failed to fetch examples' },
      { status: 500 }
    )
  }
} 