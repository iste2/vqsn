"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface Characteristic {
  score: number
  reasoning: string
  examples: string[]
}

interface PorterForce {
  riskScore: number
  keyFactors: string[]
  threats: string[]
  mitigations: string[]
  reasoning: string
}

interface Example {
  companyName: string
  businessModelSummary: string
  characteristics: {
    shortLifeCycleBrands: Characteristic
    essentialProducts: Characteristic
    premiumProvider: Characteristic
    regulationDriven: Characteristic
    highScalability: Characteristic
    costLeader: Characteristic
  }
  porterAnalysis: {
    supplierPower: PorterForce
    buyerPower: PorterForce
    newEntrants: PorterForce
    substitutes: PorterForce
    competitiveRivalry: PorterForce
  }
  overallAssessment: {
    primaryRisks: string[]
    competitiveAdvantages: string[]
  }
  metadata: {
    analysisDate: string
    confidenceLevel: string
    assumptions: string[]
  }
}

interface ExampleSelectorProps {
  examples: Record<string, Example>
}

export function ExampleSelector({ examples }: ExampleSelectorProps) {
  const [selected, setSelected] = useState<string>(Object.keys(examples)[0])
  const selectedExample = examples[selected]

  return (
    <div className="space-y-6">
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an example" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(examples).map((key) => (
            <SelectItem key={key} value={key}>
              {examples[key].companyName}
            </SelectItem>
          ))}
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
              <CardTitle>Characteristics</CardTitle>
            </CardHeader>
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
                      Score: {char.score}
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
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Porter&apos;s Five Forces Analysis</CardTitle>
            </CardHeader>
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
                      Score: {force.riskScore}
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
          </Card>

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
        </div>
      )}
    </div>
  )
} 