const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = 3000

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  paletteIds: { type: Number, default: 0 },
  colorPalettes: {type: Array},
});

const galleryPostSchema = new mongoose.Schema({
  paletteName: { type: String, required: true },
  paletteColors: { type: Array, required: true },
  likes: { type: Number, default: 0 },
  createdBy: { type: String, required: true },
});

const GalleryPost = mongoose.model("GalleryPost", galleryPostSchema);
const User = mongoose.model("User", userSchema)

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ColorCodes').then(() => console.log("✅ MongoDb connected successfully!"))
    } catch (err) {
        console.log(`❌ An error occurred while trying to connect to database: ${err}!`);
    }
}

async function startPort() {
    try {
        app.listen(port)
        console.log(`✅ Connected to port ${port} successfully!`);
    } catch (err) {
        console.log(`❌ An error occurred while trying to connect to port: ${err}!`);
    }
}

app.use(express.json())
app.use(cors())

app.post('/fetchUserData', async (req,res) => {
    const lsUser = req.body.lsUser

    res.json(await User.findOne({username: lsUser}))
})

app.post("/registerUser", async (req, res) => {
  try {
    if(await User.findOne({username: req.body.username})) {
      return res.json({ok: false, status: 1})
    }
    
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ok: true, status: 30})
  } catch (err) {
    res.sendStatus(500)
  }
});

app.post("/loginUser", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // User doesn't exist
    if (!user) {
      return res.json({ ok: false, status: 2 });
    }
  
    res.json({ok: true, status: 30})
  } catch (err) {
    res.sendStatus(500)
  }
});

app.post("/createPalette", async (req, res) => {
    const { palette, username } = req.body
    const user =  await User.findOne({ username })
    palette.id = user.paletteIds

    user.colorPalettes.push(palette)
    user.paletteIds++

    user.save()
    res.sendStatus(200)
});

app.post('/deletePalette', async (req, res) => {
  const { username, paletteId } = req.body
  
  const user = await User.findOne({ username });
  user.colorPalettes = user.colorPalettes.filter(palette => palette.id !== paletteId)
  user.save()
  res.sendStatus(200)
})

app.post('/publishPalette', async (req, res) => {
  const galleryPost = new GalleryPost(req.body)
  console.log(galleryPost);
  galleryPost.save()
  
  res.sendStatus(200)
})

connectDb()
startPort()