"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Github } from "lucide-react"
import { isGitHubConnected } from "@/lib/github"

export default function GitHubConnectStep({ onNext }: { onNext: () => void }) {
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      setLoading(true)
      const connected = await isGitHubConnected()
      setConnected(connected)
      if (connected) {
        onNext()
      }
      setLoading(false)
    }

    checkConnection()
  }, [onNext])

  const handleGitHubConnect = () => {
    window.location.href = "/api/github/login"
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-sm text-muted-foreground">
        טוען מצב חיבור ל-GitHub...
      </div>
    )
  }

  return (
    <Card className="max-w-md mx-auto mt-8 p-6">
      <CardContent className="space-y-6 text-center">
        <h2 className="text-xl font-semibold">חבר את חשבון ה-GitHub שלך</h2>
        <p className="text-muted-foreground text-sm">
          נשתמש בזה כדי ליצור רפוזיטוריז, לדחוף קוד ולבצע אינטגרציה עם הפרויקטים שלך.
        </p>

        {!connected ? (
          <Button onClick={handleGitHubConnect} variant="default" className="flex gap-2 items-center mx-auto">
            <Github className="w-4 h-4" />
            התחבר ל-GitHub
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle2 className="w-5 h-5" /> GitHub מחובר
          </div>
        )}

        {/* כפתור ידני למעבר (אם לא אוטומטי) */}
        {!connected && (
          <Button
            onClick={onNext}
            className="w-full"
            variant="secondary"
          >
            המשך
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
