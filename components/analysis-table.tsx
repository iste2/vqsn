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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { FilterIcon } from "lucide-react"
import { AnalysisDetailsDialog } from "@/components/analysis-details-dialog"

interface ScoreFilter {
  min: number | null
  max: number | null
}

interface ScoreFilters {
  shortLifeCycleBrands: ScoreFilter
  essentialProducts: ScoreFilter
  premiumProvider: ScoreFilter
  regulationDriven: ScoreFilter
  highScalability: ScoreFilter
  costLeader: ScoreFilter
  supplierPower: ScoreFilter
  buyerPower: ScoreFilter
  newEntrants: ScoreFilter
  substitutes: ScoreFilter
  competitiveRivalry: ScoreFilter
}

interface AnalysisTableProps {
  analyses: CompanyAnalysis[]
}

function ScoreBadge({ score }: { score: number }) {
  const bgColor = score >= 8 
    ? "bg-green-100 text-green-800" 
    : score >= 5
    ? "bg-orange-100 text-orange-800"
    : "bg-red-100 text-red-800"

  return (
    <span className={`px-2 py-2 rounded-full text-sm font-medium ${bgColor}`}>
      {score.toFixed(0)}
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

function ScoreFilterInput({ 
  title,
  tooltip,
  filter, 
  onChange 
}: { 
  title: string
  tooltip: string
  filter: ScoreFilter
  onChange: (filter: ScoreFilter) => void 
}) {
  return (
    <div className="flex flex-col gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm font-medium">{title}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Min"
          value={filter.min ?? ""}
          onChange={(e) => onChange({ 
            ...filter, 
            min: e.target.value ? Number(e.target.value) : null 
          })}
          className="w-20 h-8"
          min={0}
          max={10}
          step={1}
        />
        <Input
          type="number"
          placeholder="Max"
          value={filter.max ?? ""}
          onChange={(e) => onChange({ 
            ...filter, 
            max: e.target.value ? Number(e.target.value) : null 
          })}
          className="w-20 h-8"
          min={0}
          max={10}
          step={1}
        />
      </div>
    </div>
  )
}

const initialScoreFilters: ScoreFilters = {
  shortLifeCycleBrands: { min: null, max: null },
  essentialProducts: { min: null, max: null },
  premiumProvider: { min: null, max: null },
  regulationDriven: { min: null, max: null },
  highScalability: { min: null, max: null },
  costLeader: { min: null, max: null },
  supplierPower: { min: null, max: null },
  buyerPower: { min: null, max: null },
  newEntrants: { min: null, max: null },
  substitutes: { min: null, max: null },
  competitiveRivalry: { min: null, max: null }
}

export function AnalysisTable({ analyses }: AnalysisTableProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<CompanyAnalysis | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [scoreFilters, setScoreFilters] = useState<ScoreFilters>(initialScoreFilters)

  const filteredAnalyses = analyses.filter((analysis) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      analysis.company.name.toLowerCase().includes(searchLower) ||
      analysis.company.ticker.toLowerCase().includes(searchLower)

    const matchesScoreFilters = 
      (!scoreFilters.shortLifeCycleBrands.min || analysis.characteristics.shortLifeCycleBrands.score >= scoreFilters.shortLifeCycleBrands.min) &&
      (!scoreFilters.shortLifeCycleBrands.max || analysis.characteristics.shortLifeCycleBrands.score <= scoreFilters.shortLifeCycleBrands.max) &&
      (!scoreFilters.essentialProducts.min || analysis.characteristics.essentialProducts.score >= scoreFilters.essentialProducts.min) &&
      (!scoreFilters.essentialProducts.max || analysis.characteristics.essentialProducts.score <= scoreFilters.essentialProducts.max) &&
      (!scoreFilters.premiumProvider.min || analysis.characteristics.premiumProvider.score >= scoreFilters.premiumProvider.min) &&
      (!scoreFilters.premiumProvider.max || analysis.characteristics.premiumProvider.score <= scoreFilters.premiumProvider.max) &&
      (!scoreFilters.regulationDriven.min || analysis.characteristics.regulationDriven.score >= scoreFilters.regulationDriven.min) &&
      (!scoreFilters.regulationDriven.max || analysis.characteristics.regulationDriven.score <= scoreFilters.regulationDriven.max) &&
      (!scoreFilters.highScalability.min || analysis.characteristics.highScalability.score >= scoreFilters.highScalability.min) &&
      (!scoreFilters.highScalability.max || analysis.characteristics.highScalability.score <= scoreFilters.highScalability.max) &&
      (!scoreFilters.costLeader.min || analysis.characteristics.costLeader.score >= scoreFilters.costLeader.min) &&
      (!scoreFilters.costLeader.max || analysis.characteristics.costLeader.score <= scoreFilters.costLeader.max) &&
      (!scoreFilters.supplierPower.min || analysis.porterAnalysis.supplierPower.score >= scoreFilters.supplierPower.min) &&
      (!scoreFilters.supplierPower.max || analysis.porterAnalysis.supplierPower.score <= scoreFilters.supplierPower.max) &&
      (!scoreFilters.buyerPower.min || analysis.porterAnalysis.buyerPower.score >= scoreFilters.buyerPower.min) &&
      (!scoreFilters.buyerPower.max || analysis.porterAnalysis.buyerPower.score <= scoreFilters.buyerPower.max) &&
      (!scoreFilters.newEntrants.min || analysis.porterAnalysis.newEntrants.score >= scoreFilters.newEntrants.min) &&
      (!scoreFilters.newEntrants.max || analysis.porterAnalysis.newEntrants.score <= scoreFilters.newEntrants.max) &&
      (!scoreFilters.substitutes.min || analysis.porterAnalysis.substitutes.score >= scoreFilters.substitutes.min) &&
      (!scoreFilters.substitutes.max || analysis.porterAnalysis.substitutes.score <= scoreFilters.substitutes.max) &&
      (!scoreFilters.competitiveRivalry.min || analysis.porterAnalysis.competitiveRivalry.score >= scoreFilters.competitiveRivalry.min) &&
      (!scoreFilters.competitiveRivalry.max || analysis.porterAnalysis.competitiveRivalry.score <= scoreFilters.competitiveRivalry.max)

    return matchesSearch && matchesScoreFilters
  })

  const hasActiveFilters = Object.values(scoreFilters).some(
    filter => filter.min !== null || filter.max !== null
  )

  const activeFilterCount = Object.values(scoreFilters).filter(
    filter => filter.min !== null || filter.max !== null
  ).length

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search by company name or ticker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => document.getElementById("filters-accordion")?.click()}
          className="relative w-10"
        >
          <FilterIcon className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>
      <Accordion type="single" collapsible defaultValue={hasActiveFilters ? "filters" : undefined}>
        <AccordionItem value="filters">
          <AccordionTrigger id="filters-accordion" className="sr-only">
            Filters
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
              <ScoreFilterInput
                title="Short Life Brands"
                tooltip="Products with short life cycles and frequent brand changes"
                filter={scoreFilters.shortLifeCycleBrands}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, shortLifeCycleBrands: filter }))}
              />
              <ScoreFilterInput
                title="Essential"
                tooltip="Essential products and services"
                filter={scoreFilters.essentialProducts}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, essentialProducts: filter }))}
              />
              <ScoreFilterInput
                title="Premium"
                tooltip="Premium provider in the market"
                filter={scoreFilters.premiumProvider}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, premiumProvider: filter }))}
              />
              <ScoreFilterInput
                title="Regulation"
                tooltip="Business driven by regulation"
                filter={scoreFilters.regulationDriven}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, regulationDriven: filter }))}
              />
              <ScoreFilterInput
                title="Scalability"
                tooltip="High scalability potential"
                filter={scoreFilters.highScalability}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, highScalability: filter }))}
              />
              <ScoreFilterInput
                title="Cost Lead"
                tooltip="Cost leadership position"
                filter={scoreFilters.costLeader}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, costLeader: filter }))}
              />
              <ScoreFilterInput
                title="Suppliers"
                tooltip="Supplier bargaining power"
                filter={scoreFilters.supplierPower}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, supplierPower: filter }))}
              />
              <ScoreFilterInput
                title="Buyers"
                tooltip="Buyer bargaining power"
                filter={scoreFilters.buyerPower}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, buyerPower: filter }))}
              />
              <ScoreFilterInput
                title="Entrants"
                tooltip="Threat of new entrants"
                filter={scoreFilters.newEntrants}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, newEntrants: filter }))}
              />
              <ScoreFilterInput
                title="Substitutes"
                tooltip="Threat of substitute products"
                filter={scoreFilters.substitutes}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, substitutes: filter }))}
              />
              <ScoreFilterInput
                title="Rivalry"
                tooltip="Competitive rivalry in the industry"
                filter={scoreFilters.competitiveRivalry}
                onChange={(filter) => setScoreFilters(prev => ({ ...prev, competitiveRivalry: filter }))}
              />
            </div>
            <div className="flex justify-end px-4 pt-2">
              <Button
                variant="outline"
                onClick={() => setScoreFilters(initialScoreFilters)}
                className="text-sm"
              >
                Reset Filters
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
      <AnalysisDetailsDialog 
        analysis={selectedAnalysis} 
        onClose={() => setSelectedAnalysis(null)} 
      />
    </div>
  )
} 