"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function AppTypeStep({ onNext }: { onNext: (type: "public" | "custom") => void }) {
  const [selected, setSelected] = useState<"public" | "custom" | null>(null)

  const handleSelect = (type: "public" | "custom") => {
    setSelected(type)
  }

  const handleContinue = () => {
    if (selected) onNext(selected)
  }

  return (
    <Card className="max-w-md mx-auto mt-8 p-4">
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold text-center">Select App Type</h2>

        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className={cn(
              "w-32",
              selected === "public" && "border-2 border-blue-500"
            )}
            onClick={() => handleSelect("public")}
          >
            Public App
          </Button>

          <Button
            variant="outline"
            className={cn(
              "w-32",
              selected === "custom" && "border-2 border-blue-500"
            )}
            onClick={() => handleSelect("custom")}
          >
            Custom App
          </Button>
        </div>

        <Button
          disabled={!selected}
          onClick={handleContinue}
          className="w-full"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
