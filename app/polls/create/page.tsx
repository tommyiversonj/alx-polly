import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Create Poll | ALX Polly",
  description: "Create a new poll",
}

export default function CreatePollPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Poll</h1>
        <p className="text-gray-600 mt-2">Share your question with the community</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Poll Details</CardTitle>
          <CardDescription>
            Fill in the details below to create your poll
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Poll Title</Label>
              <Input 
                id="title" 
                placeholder="What's your favorite programming language?" 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="Provide additional context for your poll..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Poll Options</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Option 1" required />
                  <Button type="button" variant="outline" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Option 2" required />
                  <Button type="button" variant="outline" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Option 3" />
                  <Button type="button" variant="outline" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Button type="button" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date (Optional)</Label>
              <Input 
                id="endDate" 
                type="datetime-local"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Poll
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
