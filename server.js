import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// Root endpoint — public
app.get("/", (req, res) => {
  res.send("Star Music City Backend Running")
})

// Example protected route
// Natively injects authentication middleware on /api/auth
// Here we just simulate a route that requires auth
app.get("/api/protected", (req, res) => {
  // Natively injects session info in req.session or headers
  // You can access the user info like this if Natively provides it:
  // const user = req.headers["x-natively-user"]
  // For demonstration, just return a sample response
  res.json({
    message: "This is a protected route",
    note: "Use Natively's /api/auth to handle login/signup"
  })
})

// Add your own API routes here
// Example:
// app.post("/api/songs", (req, res) => { ... })

// Use Render's port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))





