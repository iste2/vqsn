import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'

interface CompanyData {
  ticker: string
  name: string
  price: number
  price_change_today: number
  business: string
  risk: string
  management: string
  swot: {
    strengths: string
    weaknesses: string
    opportunities: string
    threats: string
    summary: string
  }
  moat: string
  dcf: {
    historical_data: {
      revenue: Record<string, number>
      free_cash_flow: Record<string, number>
      ebitda: Record<string, number>
    }
    projections: {
      revenue_growth: Record<string, number>
      revenue: Record<string, number>
      fcf_margin: Record<string, number>
      free_cash_flow: Record<string, number>
    }
    dcf_assumptions: {
      wacc: number
      terminal_growth: number
      terminal_fcf_margin: number
      shares_outstanding: number
      net_debt: number
    }
    terminal_value: {
      terminal_fcf: number
      terminal_value: number
      present_value_terminal: number
    }
    valuation_summary: {
      present_value_fcf: number
      enterprise_value: number
      equity_value: number
      price_per_share: number
    }
    sensitivity_analysis: {
      wacc_range: number[]
      terminal_growth_range: number[]
      price_matrix: number[][]
    }
    key_metrics: {
      ev_to_revenue_2021: number
      ev_to_ebitda_2021: number
      price_to_fcf_2021: number
    }
  }
}

interface CompanyAnalysisCardProps {
  data: CompanyData
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="text-sm text-muted-foreground mb-4 last:mb-0">{children}</p>,
        h1: ({ children }) => <h1 className="text-xl font-semibold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-semibold mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-md font-semibold mb-2">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm text-muted-foreground">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/10 pl-4 italic my-4">{children}</blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export function CompanyAnalysisCard({ data }: CompanyAnalysisCardProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Company Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-muted-foreground">{data.ticker}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${data.price.toLocaleString()}</p>
          <p className={`text-sm ${data.price_change_today >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.price_change_today >= 0 ? '+' : ''}{data.price_change_today.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="moat">Moat</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
        </TabsList>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Business Overview</h3>
              <MarkdownContent content={data.business} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moat Tab */}
        <TabsContent value="moat">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Competitive Moat</h3>
              <MarkdownContent content={data.moat} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Risk Analysis</h3>
              <MarkdownContent content={data.risk} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Management Tab */}
        <TabsContent value="management">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Management Assessment</h3>
              <MarkdownContent content={data.management} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SWOT Tab */}
        <TabsContent value="swot">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-600">Strengths</h4>
                  <MarkdownContent content={data.swot.strengths} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-red-600">Weaknesses</h4>
                  <MarkdownContent content={data.swot.weaknesses} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-600">Opportunities</h4>
                  <MarkdownContent content={data.swot.opportunities} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-orange-600">Threats</h4>
                  <MarkdownContent content={data.swot.threats} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <MarkdownContent content={data.swot.summary} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valuation Tab */}
        <TabsContent value="valuation">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">WACC</p>
                  <p className="text-lg font-semibold">{(data.dcf.dcf_assumptions.wacc * 100).toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Terminal Growth</p>
                  <p className="text-lg font-semibold">{(data.dcf.dcf_assumptions.terminal_growth * 100).toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Terminal FCF Margin</p>
                  <p className="text-lg font-semibold">{(data.dcf.dcf_assumptions.terminal_fcf_margin * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Valuation Summary</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Enterprise Value</p>
                    <p className="text-lg font-semibold">${(data.dcf.valuation_summary.enterprise_value / 1e9).toFixed(1)}B</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Equity Value</p>
                    <p className="text-lg font-semibold">${(data.dcf.valuation_summary.equity_value / 1e9).toFixed(1)}B</p>
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Fair Value per Share</p>
                    <p className="text-xl font-bold">${data.dcf.valuation_summary.price_per_share.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 