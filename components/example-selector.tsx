"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CompanyAnalysisCard } from "@/components/company-analysis-card"
import airbnbData from "@/examples/airbnb.json"

const examples = [
  { data: airbnbData },
]

export function ExampleSelector() {
  const [selected, setSelected] = useState<string>("")

  const selectedExample = examples.find((example) => example.data.ticker === selected)

  return (
    <div>
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an example" />
        </SelectTrigger>
        <SelectContent>
          {examples.map((example) => (
            <SelectItem key={example.data.ticker} value={example.data.ticker}>
              {example.data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedExample && <CompanyAnalysisCard data={selectedExample.data} />}
    </div>
  )
} 