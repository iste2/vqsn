import { headers } from 'next/headers'
import { AnalysisTable } from "@/components/analysis-table"
import { Waitlist } from "@/components/waitlist"
import { CompanyAnalysis } from "@/lib/analysis/interfaces"

async function getAnalyses(): Promise<CompanyAnalysis[]> {
  // Get headers synchronously
  const headersList = await headers()
  // Convert to plain object to access get method
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  
  const response = await fetch(`${protocol}://${host}/api/analysis`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch analyses')
  }

  return response.json()
}

export default async function ExamplesPage() {
  const analyses = await getAnalyses()

  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="container max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Company Analysis Examples</h1>
        <AnalysisTable analyses={analyses} />
        <Waitlist />
      </div>
    </div>
  )
} 