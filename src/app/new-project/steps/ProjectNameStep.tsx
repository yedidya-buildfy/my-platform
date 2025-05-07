"use client"

import { useState } from "react"
import { supabase } from "lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import WizardHeader from "components/WizardHeader"


export default function ProjectNamePage() {
  const [projectName, setProjectName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("You must be logged in to create a project.")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("projects").upsert({
      user_id: user.id,
      name: projectName,
    })

    if (error) {
      setMessage("Failed to save project. Please try again.")
    } else {
      setMessage("Project created successfully!")
    }

    setLoading(false)
  }

  return (
    <>
      <WizardHeader current="Project Name" />

      <Card className="max-w-md mx-auto mt-8">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save project"}
            </Button>
            {message && <p className="text-sm text-center text-red-500">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </>
  )
}
