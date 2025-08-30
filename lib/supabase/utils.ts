import { supabase } from './client'
import type { Database } from './client'

type User = Database['public']['Tables']['users']['Row']
type Poll = Database['public']['Tables']['polls']['Row']
type PollOption = Database['public']['Tables']['poll_options']['Row']
type Vote = Database['public']['Tables']['votes']['Row']

// User operations
export const userUtils = {
  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    
    return data
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
    
    return data
  },

  // Create new user
  async createUser(userData: {
    email: string
    name: string
    username: string
    avatar_url?: string
    bio?: string
  }): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    }
    
    return data
  },

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user:', error)
      return null
    }
    
    return data
  }
}

// Poll operations
export const pollUtils = {
  // Get all polls
  async getAllPolls(): Promise<Poll[]> {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        *,
        users!polls_created_by_fkey(name, username),
        poll_options(*),
        votes(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching polls:', error)
      return []
    }
    
    return data || []
  },

  // Get active polls
  async getActivePolls(): Promise<Poll[]> {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        *,
        users!polls_created_by_fkey(name, username),
        poll_options(*),
        votes(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching active polls:', error)
      return []
    }
    
    return data || []
  },

  // Get poll by ID
  async getPollById(id: string): Promise<Poll | null> {
    const { data, error } = await supabase
      .from('polls')
      .select(`
        *,
        users!polls_created_by_fkey(name, username),
        poll_options(*),
        votes(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching poll:', error)
      return null
    }
      return data
  },

  // Create new poll
  async createPoll(pollData: {
    title: string
    description?: string
    created_by: string
    is_active?: boolean
    allow_multiple_votes?: boolean
    is_anonymous?: boolean
    end_date?: string
  }, options: string[]): Promise<Poll | null> {
    // Start a transaction
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert([pollData])
      .select()
      .single()
    
    if (pollError) {
      console.error('Error creating poll:', pollError)
      return null
    }
    
    // Add poll options
    const pollOptions = options.map(text => ({
      poll_id: poll.id,
      text
    }))
    
    const { error: optionsError } = await supabase
      .from('poll_options')
      .insert(pollOptions)
    
    if (optionsError) {
      console.error('Error creating poll options:', optionsError)
      return null
    }
    
    return poll
  },

  // Update poll
  async updatePoll(id: string, updates: Partial<Poll>): Promise<Poll | null> {
    const { data, error } = await supabase
      .from('polls')
      .insert([updates])
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating poll:', error)
      return null
    }
    
    return data
  },

  // Delete poll
  async deletePoll(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('polls')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting poll:', error)
      return false
    }
    
    return true
  }
}

// Vote operations
export const voteUtils = {
  // Get votes for a poll
  async getVotesForPoll(pollId: string): Promise<Vote[]> {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('poll_id', pollId)
    
    if (error) {
      console.error('Error fetching votes:', error)
      return []
    }
    
    return data || []
  },

  // Cast a vote
  async castVote(voteData: {
    poll_id: string
    option_id: string
    user_id: string
  }): Promise<Vote | null> {
    // Check if user already voted (for non-multiple vote polls)
    const poll = await pollUtils.getPollById(voteData.poll_id)
    if (!poll?.allow_multiple_votes) {
      const existingVote = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', voteData.poll_id)
        .eq('user_id', voteData.user_id)
        .single()
      
      if (existingVote.data) {
        console.error('User already voted on this poll')
        return null
      }
    }
    
    const { data, error } = await supabase
      .from('votes')
      .insert([voteData])
      .select()
      .single()
    
    if (error) {
      console.error('Error casting vote:', error)
      return null
    }
    
    return data
  },

  // Remove a vote
  async removeVote(voteId: string): Promise<boolean> {
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('id', voteId)
    
    if (error) {
      console.error('Error removing vote:', error)
      return false
    }
    
    return true
  }
}

// Analytics operations
export const analyticsUtils = {
  // Get poll statistics
  async getPollStats(pollId: string) {
    const { data: votes, error } = await supabase
      .from('votes')
      .select(`
        *,
        poll_options!votes_option_id_fkey(text)
      `)
      .eq('poll_id', pollId)
    
    if (error) {
      console.error('Error fetching poll stats:', error)
      return null
    }
    
    // Calculate statistics
    const totalVotes = votes.length
    const optionCounts = votes.reduce((acc, vote) => {
      const optionText = vote.poll_options?.text || 'Unknown'
      acc[optionText] = (acc[optionText] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return {
      totalVotes,
      optionCounts,
      percentages: Object.entries(optionCounts).map(([option, count]) => ({
        option,
        count,
        percentage: totalVotes > 0 ? ((count as number) / totalVotes) * 100 : 0
      }))
    }
  },

  // Get user statistics
  async getUserStats(userId: string) {
    const { data: polls, error: pollsError } = await supabase
      .from('polls')
      .select('*')
      .eq('created_by', userId)
    
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select('*')
      .eq('user_id', userId)
    
    if (pollsError || votesError) {
      console.error('Error fetching user stats:', { pollsError, votesError })
      return null
    }
    
    return {
      pollsCreated: polls?.length || 0,
      votesCast: votes?.length || 0,
      activePolls: polls?.filter(poll => poll.is_active).length || 0
    }
  }
}
