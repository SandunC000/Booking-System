const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

//middleware
app.use(cors())
app.use(express.json())

const multer = require("multer")
require("dotenv").config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
  "mongodb+srv://sanduncooray000:ECcldY7Vw41KPWM7@cluster0.b2h8fw4.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")

    const bookingCollection = client.db("bookingDB").collection("register")

    app.post("/register", upload.single("photo"), async (req, res) => {
      try {
        const data = req.body
        const photo = req.file

        data.photo = {
          data: photo.buffer,
          contentType: photo.mimetype,
        }

        const result = await bookingCollection.insertOne(data)
        res.send(result)
      } catch (error) {
        console.error("Error registering user:", error)
        res.status(500).send({ success: false, message: "Internal server error." })
      }
    })

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body
        const user = await bookingCollection.findOne({ email })
        if (user) {
          if (password === user.password) {
            res.json({ success: true, message: "Login successful", data: user })
          } else {
            res.status(401).json({ success: false, message: "Invalid credentials" })
          }
        } else {
          res.status(404).json({ success: false, message: "User not found" })
        }
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
      }
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`Booking app listening on port ${port}`)
})
