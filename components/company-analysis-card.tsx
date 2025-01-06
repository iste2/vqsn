import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface CompanyData {
  company_name: string
  business_summary: {
    short_summary: string
    detailed_summary: string
    tags: string[]
  }
  risk_summary: {
    short_summary: string
    detailed_summary: string
    tags: string[]
  }
  discussion_summary: {
    short_summary: string
    detailed_summary: string
    tags: string[]
  }
}

interface CompanyAnalysisCardProps {
  data: CompanyData
}

export function CompanyAnalysisCard({ data }: CompanyAnalysisCardProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    business: false,
    risk: false,
    discussion: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6 mt-6">
      <Card>
        <Collapsible
          open={openSections.business}
          onOpenChange={() => toggleSection("business")}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{data.company_name}</CardTitle>
                <CardDescription>{data.business_summary.short_summary}</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.business ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.business_summary.tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <CollapsibleContent>
              <p className="text-sm text-muted-foreground mt-4">
                {data.business_summary.detailed_summary}
              </p>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>

      <Card>
        <Collapsible
          open={openSections.risk}
          onOpenChange={() => toggleSection("risk")}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Risk Analysis</CardTitle>
                <CardDescription>{data.risk_summary.short_summary}</CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.risk ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CardContent>
            <CollapsibleContent>
              <p className="text-sm text-muted-foreground">
                {data.risk_summary.detailed_summary}
              </p>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>

      <Card>
        <Collapsible
          open={openSections.discussion}
          onOpenChange={() => toggleSection("discussion")}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Discussion Summary</CardTitle>
                <CardDescription>
                  {data.discussion_summary.short_summary}
                </CardDescription>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {openSections.discussion ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </CardHeader>
          <CardContent>
            <CollapsibleContent>
              <p className="text-sm text-muted-foreground">
                {data.discussion_summary.detailed_summary}
              </p>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>
    </div>
  )
} 