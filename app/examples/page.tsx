import { AnalysisTable } from "@/components/analysis-table"
import { Waitlist } from "@/components/waitlist"
import {getAnalysisTableView} from "@/app/actions/analysis";

export default async function ExamplesPage() {
  const analyses = await getAnalysisTableView();

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