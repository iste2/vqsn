"use client"

import { useState } from "react"
import { CompanyAnalysis } from "@/lib/analysis/interfaces"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AnalysisTableProps {
  analyses: CompanyAnalysis[]
}

function ScoreBadge({ score }: { score: number }) {
  const bgColor = score >= 9 
    ? "bg-green-100 text-green-800" 
    : score >= 6
    ? "bg-orange-100 text-orange-800"
    : "bg-red-100 text-red-800"

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${bgColor}`}>
      {score.toFixed(1)}
    </span>
  )
}

function TableHeadWithTooltip({ title, tooltip }: { title: string, tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TableHead className="text-center whitespace-normal">
            <span className="block text-xs leading-tight">{title}</span>
          </TableHead>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function AnalysisTable({ analyses }: AnalysisTableProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<CompanyAnalysis | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAnalyses = analyses.filter((analysis) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      analysis.company.name.toLowerCase().includes(searchLower) ||
      analysis.company.ticker.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search by company name or ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Ticker</TableHead>
              <TableHead className="whitespace-nowrap">Company</TableHead>
              <TableHeadWithTooltip 
                title="Short Life Brands"
                tooltip="Products with short life cycles and frequent brand changes"
              />
              <TableHeadWithTooltip 
                title="Essential"
                tooltip="Essential products and services"
              />
              <TableHeadWithTooltip 
                title="Premium"
                tooltip="Premium provider in the market"
              />
              <TableHeadWithTooltip 
                title="Regulation"
                tooltip="Business driven by regulation"
              />
              <TableHeadWithTooltip 
                title="Scalability"
                tooltip="High scalability potential"
              />
              <TableHeadWithTooltip 
                title="Cost Lead"
                tooltip="Cost leadership position"
              />
              <TableHeadWithTooltip 
                title="Suppliers"
                tooltip="Supplier bargaining power"
              />
              <TableHeadWithTooltip 
                title="Buyers"
                tooltip="Buyer bargaining power"
              />
              <TableHeadWithTooltip 
                title="Entrants"
                tooltip="Threat of new entrants"
              />
              <TableHeadWithTooltip 
                title="Substitutes"
                tooltip="Threat of substitute products"
              />
              <TableHeadWithTooltip 
                title="Rivalry"
                tooltip="Competitive rivalry in the industry"
              />
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnalyses.map((analysis) => (
              <TableRow key={analysis.company.ticker}>
                <TableCell className="font-medium whitespace-nowrap">
                  {analysis.company.ticker}
                </TableCell>
                <TableCell className="whitespace-nowrap">{analysis.company.name}</TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.shortLifeCycleBrands.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.essentialProducts.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.premiumProvider.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.regulationDriven.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.highScalability.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.characteristics.costLeader.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.porterAnalysis.supplierPower.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.porterAnalysis.buyerPower.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.porterAnalysis.newEntrants.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.porterAnalysis.substitutes.score} />
                </TableCell>
                <TableCell className="text-center">
                  <ScoreBadge score={analysis.porterAnalysis.competitiveRivalry.score} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAnalysis(analysis)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 