import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <div className="mb-2">
              <Badge>Shadcn + Tailwind</Badge>
            </div>

            <CardTitle>Setup Test</CardTitle>
            <CardDescription>
              Testing whether React, TypeScript, Tailwind CSS, and shadcn/ui
              are working correctly.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>

              <Input
                id="name"
                placeholder="Enter your name..."
              />
            </div>

            <div className="flex gap-3">
              <Button>
                Primary Button
              </Button>

              <Button variant="outline">
                Outline Button
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App