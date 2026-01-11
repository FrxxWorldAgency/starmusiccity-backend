import express from "express"
import cors from "cors"
import { betterAuth } from "better-auth"
import { createClient } from "@supabase/supabase-js"

const app = express()
app.use(cors())
app.use(express.json())

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Configure Better Auth with Supabase adapter
const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: {
    provider: "supabase",
    client: supabase
  },
  emailAndPassword: {
    enabled: true
  }
})

// Auth routes
app.use("/api/auth", auth.handler)

// Test endpoint
app.get("/", (req, res) => {
  res.send("Star Music City Backend Running")
})

// Use Render's assigned port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

