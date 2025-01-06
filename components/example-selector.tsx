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
import ibioData from "@/examples/ibio/ibio.json"
import regoData from "@/examples/rego/rego.json"

const examples = [
  { id: "ibio", name: "iBio Example", data: ibioData },
  { id: "rego", name: "REGO Payment Architectures Example", data: regoData },
]

export function ExampleSelector() {
  const [selected, setSelected] = useState<string>("")

  const selectedExample = examples.find((example) => example.id === selected)

  return (
    <div>
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an example" />
        </SelectTrigger>
        <SelectContent>
          {examples.map((example) => (
            <SelectItem key={example.id} value={example.id}>
              {example.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedExample && <CompanyAnalysisCard data={selectedExample.data} />}
    </div>
  )
} 