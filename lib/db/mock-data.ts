import { Poll, User, PollStats } from "@/lib/types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "Software developer passionate about creating meaningful applications.",
    joinDate: "2024-01-01",
    totalPolls: 12,
    totalVotes: 156,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    bio: "Full-stack developer and open source contributor.",
    joinDate: "2024-01-05",
    totalPolls: 8,
    totalVotes: 89,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    username: "mikejohnson",
    bio: "DevOps engineer and cloud enthusiast.",
    joinDate: "2024-01-10",
    totalPolls: 5,
    totalVotes: 234,
  },
]

export const mockPolls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Let's see which programming language is most popular among developers. This poll will help us understand the community's preferences.",
    options: [
      { id: "1", text: "JavaScript", votes: 45, percentage: 28.8 },
      { id: "2", text: "Python", votes: 38, percentage: 24.4 },
      { id: "3", text: "TypeScript", votes: 32, percentage: 20.5 },
      { id: "4", text: "Rust", votes: 25, percentage: 16.0 },
      { id: "5", text: "Go", votes: 16, percentage: 10.3 },
    ],
    totalVotes: 156,
    createdAt: "2024-01-15",
    endDate: "2024-02-15",
    isActive: true,
    createdBy: "1",
  },
  {
    id: "2",
    title: "Best framework for web development",
    description: "Vote for your preferred web development framework",
    options: [
      { id: "6", text: "React", votes: 28, percentage: 31.5 },
      { id: "7", text: "Vue.js", votes: 22, percentage: 24.7 },
      { id: "8", text: "Angular", votes: 18, percentage: 20.2 },
      { id: "9", text: "Svelte", votes: 12, percentage: 13.5 },
      { id: "10", text: "Next.js", votes: 9, percentage: 10.1 },
    ],
    totalVotes: 89,
    createdAt: "2024-01-14",
    endDate: "2024-02-14",
    isActive: true,
    createdBy: "2",
  },
  {
    id: "3",
    title: "Preferred database system",
    description: "Which database system do you prefer for your projects?",
    options: [
      { id: "11", text: "PostgreSQL", votes: 67, percentage: 28.6 },
      { id: "12", text: "MongoDB", votes: 58, percentage: 24.8 },
      { id: "13", text: "MySQL", votes: 45, percentage: 19.2 },
      { id: "14", text: "Redis", votes: 34, percentage: 14.5 },
      { id: "15", text: "SQLite", votes: 30, percentage: 12.8 },
    ],
    totalVotes: 234,
    createdAt: "2024-01-13",
    endDate: "2024-02-13",
    isActive: false,
    createdBy: "3",
  },
  {
    id: "4",
    title: "Favorite cloud provider",
    description: "Which cloud provider do you prefer for hosting your applications?",
    options: [
      { id: "16", text: "AWS", votes: 89, percentage: 35.6 },
      { id: "17", text: "Google Cloud", votes: 52, percentage: 20.8 },
      { id: "18", text: "Azure", votes: 48, percentage: 19.2 },
      { id: "19", text: "DigitalOcean", votes: 35, percentage: 14.0 },
      { id: "20", text: "Vercel", votes: 26, percentage: 10.4 },
    ],
    totalVotes: 250,
    createdAt: "2024-01-12",
    endDate: "2024-02-12",
    isActive: true,
    createdBy: "1",
  },
  {
    id: "5",
    title: "Preferred code editor",
    description: "What's your go-to code editor for development?",
    options: [
      { id: "21", text: "VS Code", votes: 120, percentage: 48.0 },
      { id: "22", text: "IntelliJ IDEA", votes: 45, percentage: 18.0 },
      { id: "23", text: "Vim/Neovim", votes: 35, percentage: 14.0 },
      { id: "24", text: "Sublime Text", votes: 25, percentage: 10.0 },
      { id: "25", text: "Atom", votes: 15, percentage: 6.0 },
      { id: "26", text: "Other", votes: 10, percentage: 4.0 },
    ],
    totalVotes: 250,
    createdAt: "2024-01-11",
    endDate: "2024-02-11",
    isActive: true,
    createdBy: "2",
  },
]

export const mockStats: PollStats = {
  totalPolls: 5,
  totalVotes: 979,
  activePolls: 3,
  totalResponses: 2500,
}

export const getPollById = (id: string): Poll | undefined => {
  return mockPolls.find(poll => poll.id === id)
}

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getPollsByUser = (userId: string): Poll[] => {
  return mockPolls.filter(poll => poll.createdBy === userId)
}

export const getActivePolls = (): Poll[] => {
  return mockPolls.filter(poll => poll.isActive)
}

export const getRecentPolls = (limit: number = 5): Poll[] => {
  return mockPolls
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}
