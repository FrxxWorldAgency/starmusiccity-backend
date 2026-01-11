import express from "express"
import cors from "cors"
import { createAuth } from "better-auth"
import { SupabaseAdapter } from "better-auth/adapters/supabase"

const app = express()
app.use(cors())
app.use(express.json())

const auth = createAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  emailAndPassword: { enabled: true }
})

app.use("/api/auth", auth.handler)

app.get("/", (req, res) => {
  res.send("Star Music City Backend Running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
