const express = require('express')
const mongoose = require('mongoose')
const bobyParser = require('body-parser')

const commits = require('./routes/commits')
const users = require('./routes/users')
const login = require('./routes/login')

mongoose.connect('mongodb://localhost/habits', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB.'))
.catch(() => console.error('Could not connect to MongoDB.'))

const app = express()
app.use(bobyParser.json())

// app.use('/api/commits', commits)
app.use('/api/users', users)
app.use('/api/login', login)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
