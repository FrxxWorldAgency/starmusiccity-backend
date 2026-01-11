import express from "express"
import cors from "cors"
import { betterAuth } from "better-auth"
import { createClient } from "@supabase/supabase-js"

// Express setup
const app = express()
app.use(cors())
app.use(express.json())

// Supabase client (service role key required)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Better Auth setup
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,        // e.g., "https://your-app.onrender.com"
  secret: process.env.BETTER_AUTH_SECRET,      // random long secret
  database: {
    provider: "supabase",
    client: supabase
  },
  emailAndPassword: { enabled: true }
})

// Auth routes
app.use("/api/auth", auth.handler)

// Test endpoint
app.get("/", (req, res) => {
  res.send("Star Music City Backend Running")
})

// Render requires PORT from environment
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


