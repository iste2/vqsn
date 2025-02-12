"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown } from "lucide-react"
import Example from "@/app/examples/interfaces"

interface ExampleSelectorProps {
  examples: Record<string, Example>
}

export function ExampleSelector({ examples }: ExampleSelectorProps) {
  const [selected, setSelected] = useState<string>(Object.keys(examples)[0])
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(false)
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)
  const selectedExample = examples[selected]

  return (
    <div className="space-y-6 mb-8">
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an example" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(examples).map((key) => {
            const example = examples[key];
            const avgCharScore = Object.values(example.characteristics).reduce((sum, char) => sum + char.score, 0) / 6;
            const avgPorterScore = Object.values(example.porterAnalysis).reduce((sum, force) => sum + force.riskScore, 0) / 5;
            
            return (
              <SelectItem key={key} value={key} className="w-full">
                <div className="flex items-center w-full gap-6">
                  <div className="font-medium flex-1 text-left">{example.companyName}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">B</span>
                      <div className={`h-2 w-2 rounded-full ${
                        avgCharScore >= 4 
                          ? "bg-green-500" 
                          : avgCharScore >= 2.5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`} />
                      <span className="font-medium">{avgCharScore.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">I</span>
                      <div className={`h-2 w-2 rounded-full ${
                        avgPorterScore >= 4 
                          ? "bg-green-500" 
                          : avgPorterScore >= 2.5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`} />
                      <span className="font-medium">{avgPorterScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {selectedExample && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Model Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{selectedExample.businessModelSummary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scores Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Business Model Characteristics</h3>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="grid gap-3">
                    {Object.entries(selectedExample.characteristics).map(([key, char]) => (
                      <div key={key} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className={`w-2 h-8 rounded-full ${
                          char.score >= 4 
                            ? "bg-green-500" 
                            : char.score >= 2
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`} />
                        <div className="flex-1">
                          <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 flex-1 bg-gray-200 rounded-full">
                              <div 
                                className={`h-2 rounded-full ${
                                  char.score >= 4 
                                    ? "bg-green-500" 
                                    : char.score >= 2
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${(char.score / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{char.score}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Industry Structure</h3>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="grid gap-3">
                    {Object.entries(selectedExample.porterAnalysis).map(([key, force]) => (
                      <div key={key} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className={`w-2 h-8 rounded-full ${
                          force.riskScore >= 4 
                            ? "bg-green-500" 
                            : force.riskScore >= 2
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`} />
                        <div className="flex-1">
                          <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 flex-1 bg-gray-200 rounded-full">
                              <div 
                                className={`h-2 rounded-full ${
                                  force.riskScore >= 4 
                                    ? "bg-green-500" 
                                    : force.riskScore >= 2
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${(force.riskScore / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{force.riskScore}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Collapsible open={isCharacteristicsOpen} onOpenChange={setIsCharacteristicsOpen}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <CardTitle>Business Model Characteristics</CardTitle>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCharacteristicsOpen ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {Object.entries(selectedExample.characteristics).map(([key, char]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <span className={`px-2 py-1 rounded text-sm ${
                          char.score >= 4 
                            ? "bg-green-100 text-green-800" 
                            : char.score >= 2
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {char.score}
                        </span>
                      </div>
                      <p>{char.reasoning}</p>
                      <ul className="list-disc pl-6">
                        {char.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible open={isIndustryOpen} onOpenChange={setIsIndustryOpen}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <CardTitle>Industry Structure</CardTitle>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isIndustryOpen ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  {Object.entries(selectedExample.porterAnalysis).map(([key, force]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                        <span className={`px-2 py-1 rounded text-sm ${
                          force.riskScore >= 4 
                            ? "bg-green-100 text-green-800" 
                            : force.riskScore >= 2
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {force.riskScore}
                        </span>
                      </div>
                      <p>{force.reasoning}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Key Factors</h4>
                          <ul className="list-disc pl-6">
                            {force.keyFactors.map((factor, i) => (
                              <li key={i}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Threats</h4>
                          <ul className="list-disc pl-6">
                            {force.threats.map((threat, i) => (
                              <li key={i}>{threat}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Mitigations</h4>
                          <ul className="list-disc pl-6">
                            {force.mitigations.map((mitigation, i) => (
                              <li key={i}>{mitigation}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Card>
            <CardHeader>
              <CardTitle>Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Primary Risks</h3>
                <ul className="list-disc pl-6">
                  {selectedExample.overallAssessment.primaryRisks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Competitive Advantages</h3>
                <ul className="list-disc pl-6">
                  {selectedExample.overallAssessment.competitiveAdvantages.map((advantage, i) => (
                    <li key={i}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Analysis Date:</span> {selectedExample.metadata.analysisDate}</p>
                <p><span className="font-medium">Confidence Level:</span> {selectedExample.metadata.confidenceLevel}</p>
                <div>
                  <h3 className="font-medium mb-2">Assumptions</h3>
                  <ul className="list-disc pl-6">
                    {selectedExample.metadata.assumptions.map((assumption, i) => (
                      <li key={i}>{assumption}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Coming Soon
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Additional Analysis Features</h3>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
                    Key Financial Metrics & Ratios
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
                    Valuation Methods
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 