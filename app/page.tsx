import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, TrendingUp, Plus } from "lucide-react"
import { getRecentPolls } from "@/lib/db/mock-data"

export default function Home() {
  const recentPolls = getRecentPolls(3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900">ALX Polly</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create and participate in polls with ease. Share your voice with the community 
            and discover what others think about important topics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/polls">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Polls
              </Button>
            </Link>
            <Link href="/polls/create">
              <Button size="lg" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create Poll
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ALX Polly?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Easy to Create</CardTitle>
                <CardDescription>
                  Create polls in seconds with our intuitive interface. No complex setup required.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Engage with your community and get real-time insights from your audience.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Real-time Results</CardTitle>
                <CardDescription>
                  See results instantly with beautiful charts and analytics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Polls Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Polls</h2>
            <Link href="/polls">
              <Button variant="outline">View All Polls</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPolls.map((poll) => (
              <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{poll.title}</CardTitle>
                    <Badge variant={poll.isActive ? "default" : "secondary"}>
                      {poll.isActive ? "Active" : "Closed"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {poll.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {poll.totalVotes} votes
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {poll.options.length} options
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Polling?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating and participating in polls. 
            It's free, easy, and fun!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </Link>
            <Link href="/polls">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Explore Polls
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
