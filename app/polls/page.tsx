import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Polls | ALX Polly",
  description: "Browse and participate in polls",
}

// Mock data - replace with actual data fetching
const mockPolls = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Let's see which programming language is most popular among developers",
    totalVotes: 156,
    createdAt: "2024-01-15",
    isActive: true,
  },
  {
    id: "2",
    title: "Best framework for web development",
    description: "Vote for your preferred web development framework",
    totalVotes: 89,
    createdAt: "2024-01-14",
    isActive: true,
  },
  {
    id: "3",
    title: "Preferred database system",
    description: "Which database system do you prefer for your projects?",
    totalVotes: 234,
    createdAt: "2024-01-13",
    isActive: false,
  },
]

export default function PollsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Polls</h1>
          <p className="text-gray-600 mt-2">Discover and participate in community polls</p>
        </div>
        <Link href="/polls/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPolls.map((poll) => (
          <Card key={poll.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{poll.title}</CardTitle>
                <Badge variant={poll.isActive ? "default" : "secondary"}>
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
              </div>
              <CardDescription>{poll.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {poll.totalVotes} votes
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {poll.createdAt}
                </div>
              </div>
              <Link href={`/polls/${poll.id}`}>
                <Button variant="outline" className="w-full">
                  {poll.isActive ? "Vote Now" : "View Results"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
