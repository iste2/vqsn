import { headers } from 'next/headers'
import { AnalysisTable } from "@/components/analysis-table"
import { Waitlist } from "@/components/waitlist"
import { CompanyAnalysisTableView } from "@/lib/analysis/interfaces"

async function getAnalyses(): Promise<CompanyAnalysisTableView[]> {
  // Get headers synchronously
  const headersList = await headers()
  // Convert to plain object to access get method
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  
  const response = await fetch(`${protocol}://${host}/api/analysis`, {
    next: { revalidate: 1 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    console.error("Failed to fetch analysis.", response)
    return [] // Return an empty array on error
  }

  return response.json()
}

export default async function ExamplesPage() {
  const analyses = await getAnalyses()

  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="container max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Company Analysis Examples</h1>
        
        <p className="text-center mb-8">
          For a detailed explanation of the points of the analyses, please refer to the <a href="/scoring" className="text-blue-500 underline">scoring guide</a>.
        </p>

        <AnalysisTable analyses={analyses} />
        <Waitlist />
      </div>
    </div>
  )
} 