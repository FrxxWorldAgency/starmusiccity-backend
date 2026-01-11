import express from "express"
import cors from "cors"
import { betterAuth } from "better-auth"
import { createClient } from "@supabase/supabase-js"

const app = express()
app.use(cors())
app.use(express.json())

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

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

app.use("/api/auth", auth.handler)

app.get("/", (req, res) => {
  res.send("Star Music City Backend Running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
