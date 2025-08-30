export interface User {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  bio?: string
  joinDate: string
  totalPolls: number
  totalVotes: number
}

export interface Poll {
  id: string
  title: string
  description?: string
  options: PollOption[]
  totalVotes: number
  createdAt: string
  endDate?: string
  isActive: boolean
  createdBy: string
  allowMultipleVotes?: boolean
  isAnonymous?: boolean
}

export interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

export interface Vote {
  id: string
  pollId: string
  optionId: string
  userId: string
  createdAt: string
}

export interface PollStats {
  totalPolls: number
  totalVotes: number
  activePolls: number
  totalResponses: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface CreatePollData {
  title: string
  description?: string
  options: string[]
  endDate?: string
  allowMultipleVotes?: boolean
  isAnonymous?: boolean
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
