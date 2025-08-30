import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Poll Details | ALX Polly",
  description: "View and vote on this poll",
}

// Mock data - replace with actual data fetching
const mockPoll = {
  id: "1",
  title: "What's your favorite programming language?",
  description: "Let's see which programming language is most popular among developers. This poll will help us understand the community's preferences and plan future content accordingly.",
  totalVotes: 156,
  createdAt: "2024-01-15",
  endDate: "2024-02-15",
  isActive: true,
  options: [
    { id: "1", text: "JavaScript", votes: 45, percentage: 28.8 },
    { id: "2", text: "Python", votes: 38, percentage: 24.4 },
    { id: "3", text: "TypeScript", votes: 32, percentage: 20.5 },
    { id: "4", text: "Rust", votes: 25, percentage: 16.0 },
    { id: "5", text: "Go", votes: 16, percentage: 10.3 },
  ],
  userVote: null, // null if not voted, option id if voted
}

export default function PollDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const poll = mockPoll // In real app, fetch poll by params.id

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={poll.isActive ? "default" : "secondary"}>
            {poll.isActive ? "Active" : "Closed"}
          </Badge>
          <span className="text-sm text-gray-600">Poll #{poll.id}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{poll.title}</h1>
        <p className="text-gray-600 mb-4">{poll.description}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {poll.totalVotes} votes
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Created {poll.createdAt}
          </div>
          {poll.endDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Ends {poll.endDate}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vote Options</CardTitle>
          <CardDescription>
            {poll.isActive 
              ? "Select your preferred option below" 
              : "This poll is closed. Here are the final results"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {poll.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.text}</span>
                <span className="text-sm text-gray-600">
                  {option.votes} votes ({option.percentage}%)
                </span>
              </div>
              <Progress value={option.percentage} className="h-2" />
              {poll.isActive && !poll.userVote && (
                <Button variant="outline" className="w-full">
                  Vote for {option.text}
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-4">
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share Poll
        </Button>
        <Button variant="outline">
          View Comments
        </Button>
      </div>
    </div>
  )
}
