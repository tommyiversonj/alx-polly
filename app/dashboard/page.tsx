import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Users, Calendar, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | ALX Polly",
  description: "Your polling dashboard",
}

// Mock data - replace with actual data fetching
const mockStats = {
  totalPolls: 12,
  totalVotes: 1234,
  activePolls: 3,
  totalResponses: 5678,
}

const mockRecentPolls = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    totalVotes: 156,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Best framework for web development",
    totalVotes: 89,
    isActive: true,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Preferred database system",
    totalVotes: 234,
    isActive: false,
    createdAt: "2024-01-13",
  },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your polls</p>
        </div>
        <Link href="/polls/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Poll
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Polls</span>
            </div>
            <div className="text-2xl font-bold">{mockStats.totalPolls}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Votes</span>
            </div>
            <div className="text-2xl font-bold">{mockStats.totalVotes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Active Polls</span>
            </div>
            <div className="text-2xl font-bold">{mockStats.activePolls}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Responses</span>
            </div>
            <div className="text-2xl font-bold">{mockStats.totalResponses}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Polls</TabsTrigger>
          <TabsTrigger value="active">Active Polls</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {mockRecentPolls.map((poll) => (
              <Card key={poll.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{poll.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{poll.totalVotes} votes</span>
                        <span>Created {poll.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={poll.isActive ? "default" : "secondary"}>
                        {poll.isActive ? "Active" : "Closed"}
                      </Badge>
                      <Link href={`/polls/${poll.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-gray-600">Active polls will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-gray-600">Analytics and charts will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
