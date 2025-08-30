# Supabase Setup Guide for ALX Polly

## 🚀 Quick Start

Your ALX Polly project is now configured with Supabase! Here's how to complete the setup:

## 📋 Prerequisites

1. ✅ Supabase project created
2. ✅ Environment variables added to `.env.local`
3. ✅ Supabase client installed

## 🗄️ Database Setup

### 1. Run the Schema

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase/schema.sql`
5. Click **Run** to execute the schema

### 2. Verify Tables Created

After running the schema, you should see these tables:
- `users` - User profiles and authentication
- `polls` - Poll information and settings
- `poll_options` - Individual poll options
- `votes` - User votes on polls

## 🔐 Authentication Setup

### Option 1: Supabase Auth (Recommended)

1. In your Supabase dashboard, go to **Authentication > Settings**
2. Configure your authentication providers:
   - **Email/Password** (enabled by default)
   - **Google OAuth** (optional)
   - **GitHub OAuth** (optional)

3. Update your `.env.local` with additional auth settings:
```bash
# Add these to your .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Option 2: Custom Auth (Current Setup)

The current setup uses mock authentication. To switch to real auth:

1. Install Supabase Auth helpers:
```bash
npm install @supabase/auth-helpers-nextjs
```

2. Update your auth utilities in `lib/auth/auth-utils.ts`

## 🎯 Using Supabase in Your App

### Basic Usage

```typescript
import { supabase } from '@/lib/supabase/client'
import { pollUtils, userUtils, voteUtils } from '@/lib/supabase/utils'

// Get all polls
const polls = await pollUtils.getAllPolls()

// Create a new poll
const newPoll = await pollUtils.createPoll({
  title: "What's your favorite color?",
  description: "Let's find out!",
  created_by: "user-id",
  is_active: true
}, ["Red", "Blue", "Green", "Yellow"])

// Cast a vote
const vote = await voteUtils.castVote({
  poll_id: "poll-id",
  option_id: "option-id",
  user_id: "user-id"
})
```

### Real-time Subscriptions

```typescript
// Subscribe to poll updates
const subscription = supabase
  .channel('poll-updates')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'polls' },
    (payload) => {
      console.log('Poll updated:', payload)
      // Update your UI here
    }
  )
  .subscribe()
```

## 🔧 Environment Variables

Make sure your `.env.local` contains:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Feature Flags
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 📊 Database Schema Overview

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Polls Table
```sql
polls (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  created_by UUID REFERENCES users(id),
  is_active BOOLEAN,
  allow_multiple_votes BOOLEAN,
  is_anonymous BOOLEAN,
  end_date TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Poll Options Table
```sql
poll_options (
  id UUID PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  text VARCHAR(255),
  created_at TIMESTAMP
)
```

### Votes Table
```sql
votes (
  id UUID PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  option_id UUID REFERENCES poll_options(id),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  UNIQUE(poll_id, user_id, option_id)
)
```

## 🛡️ Row Level Security (RLS)

The schema includes RLS policies for:

- **Users**: Can view all users, update own profile
- **Polls**: Anyone can view, creators can modify
- **Votes**: Anyone can view, users can vote/remove own votes
- **Poll Options**: Anyone can view, poll creators can add options

## 📈 Analytics and Views

### Poll Statistics View
```sql
SELECT * FROM poll_with_stats;
```

### Poll Results Function
```sql
SELECT * FROM get_poll_results('poll-uuid');
```

## 🚀 Deployment

### Vercel Deployment
1. Add environment variables in Vercel dashboard
2. Deploy your app
3. Supabase will work automatically

### Other Platforms
- Add the same environment variables to your hosting platform
- Ensure `NEXT_PUBLIC_*` variables are available at build time

## 🔍 Testing

### Test Database Connection
```typescript
// Add this to any page to test
import { supabase } from '@/lib/supabase/client'

// Test connection
const { data, error } = await supabase
  .from('users')
  .select('*')
  .limit(1)

console.log('Connection test:', { data, error })
```

### Test Poll Creation
```typescript
import { pollUtils } from '@/lib/supabase/utils'

// Create a test poll
const testPoll = await pollUtils.createPoll({
  title: "Test Poll",
  description: "This is a test poll",
  created_by: "test-user-id",
  is_active: true
}, ["Option 1", "Option 2", "Option 3"])

console.log('Test poll created:', testPoll)
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check your environment variables
   - Ensure keys are copied correctly

2. **"Table doesn't exist"**
   - Run the schema.sql file in Supabase SQL Editor
   - Check table names match exactly

3. **"RLS policy violation"**
   - Check your RLS policies in Supabase dashboard
   - Ensure user authentication is working

4. **"Connection timeout"**
   - Check your internet connection
   - Verify Supabase project is active

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 🎉 Next Steps

1. ✅ **Database setup complete**
2. 🔄 **Test the connection**
3. 🎨 **Update your components to use real data**
4. 🔐 **Implement authentication**
5. 🚀 **Deploy to production**

Your ALX Polly project is now ready to use Supabase as the backend! 🎊
