const express = require('express')
const mongoose = require('mongoose')
const bobyParser = require('body-parser')

const users = require('./routes/users')
const login = require('./routes/login')
const habits = require('./routes/habits')
const commits = require('./routes/commits')

mongoose.connect('mongodb://localhost/habits', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB.'))
.catch(() => console.error('Could not connect to MongoDB.'))

const app = express()
app.use(bobyParser.json())

app.use('/api/users', users)
app.use('/api/login', login)
app.use('/api/habits', habits)
app.use('/api/commits', commits)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
