"use client"

import { CompanyAnalysis } from "@/lib/analysis/interfaces"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalysisDetailsDialogProps {
  analysis: CompanyAnalysis | null
  onClose: () => void
}

function ScoreBadge({ score }: { score: number }) {
  const bgColor = score >= 8 
    ? "bg-green-100 text-green-800" 
    : score >= 5
    ? "bg-orange-100 text-orange-800"
    : "bg-red-100 text-red-800"

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${bgColor}`}>
      {score.toFixed(0)}
    </span>
  )
}

export function AnalysisDetailsDialog({ analysis, onClose }: AnalysisDetailsDialogProps) {
  if (!analysis) return null

  return (
    <Dialog open={!!analysis} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center justify-between">
            <div>
              <span className="font-bold">{analysis.company.name}</span>
              <span className="ml-2 text-muted-foreground">({analysis.company.ticker})</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full mt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Model Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-sm dark:prose-invert prose-slate max-w-none
                    [&>h1]:text-base [&>h1]:font-semibold [&>h1]:mt-0
                    [&>h2]:text-sm [&>h2]:font-semibold
                    [&>h3]:text-sm [&>h3]:font-medium
                    [&>p]:text-sm [&>p]:text-muted-foreground
                    [&>ul]:text-sm [&>ul]:text-muted-foreground
                    [&>ol]:text-sm [&>ol]:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: analysis.summary }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Characteristics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Short Life Cycle Brands</span>
                    <ScoreBadge score={analysis.characteristics.shortLifeCycleBrands.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.shortLifeCycleBrands.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Essential Products</span>
                    <ScoreBadge score={analysis.characteristics.essentialProducts.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.essentialProducts.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Premium Provider</span>
                    <ScoreBadge score={analysis.characteristics.premiumProvider.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.premiumProvider.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Regulation Driven</span>
                    <ScoreBadge score={analysis.characteristics.regulationDriven.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.regulationDriven.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Scalability</span>
                    <ScoreBadge score={analysis.characteristics.highScalability.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.highScalability.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cost Leader</span>
                    <ScoreBadge score={analysis.characteristics.costLeader.score} />
                  </div>
                  <p className="text-sm">{analysis.characteristics.costLeader.reasoning}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Porter&apos;s Five Forces Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Supplier Power</span>
                    <ScoreBadge score={analysis.porterAnalysis.supplierPower.score} />
                  </div>
                  <p className="text-sm">{analysis.porterAnalysis.supplierPower.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Buyer Power</span>
                    <ScoreBadge score={analysis.porterAnalysis.buyerPower.score} />
                  </div>
                  <p className="text-sm">{analysis.porterAnalysis.buyerPower.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Threat of New Entrants</span>
                    <ScoreBadge score={analysis.porterAnalysis.newEntrants.score} />
                  </div>
                  <p className="text-sm">{analysis.porterAnalysis.newEntrants.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Threat of Substitutes</span>
                    <ScoreBadge score={analysis.porterAnalysis.substitutes.score} />
                  </div>
                  <p className="text-sm">{analysis.porterAnalysis.substitutes.reasoning}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Competitive Rivalry</span>
                    <ScoreBadge score={analysis.porterAnalysis.competitiveRivalry.score} />
                  </div>
                  <p className="text-sm">{analysis.porterAnalysis.competitiveRivalry.reasoning}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 border-dashed border-2">
              <div className="absolute top-6 right-8 text-blue-500/20 dark:text-blue-400/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="54"
                  height="54"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  <path d="M5 3v4" />
                  <path d="M19 17v4" />
                  <path d="M3 5h4" />
                  <path d="M17 19h4" />
                </svg>
              </div>
              <CardHeader>
                <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <span>Coming Soon</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">New Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600/80 dark:text-blue-300/80 mb-4">Get ready for even more powerful analysis tools!</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Key Financial Metrics and Ratios</span>
                  </li>
                  <li className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Valuation Methods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 