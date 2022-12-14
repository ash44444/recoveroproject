const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')

require('./config/passport')(passport)

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.listen(9000)

const db = require('./config/keys').mongoURI

mongoose
  .connect(
    'mongodb+srv://ashishmaner:NULY2axn58HdSwZZ@cluster0.za3ivol.mongodb.net/user?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('MongoDB successfully connected.'))
  .catch((err) => console.log(err))

app.use(passport.initialize())

app.use('/api', users)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

const port = process.env.PORT || 5000

if (process.env.NODE_ENV == 'production') {
  const path = require('path')
  app.get('/', (req, res) => {
    app.use(express.static(path.join(__dirname, 'client', 'build')))
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`))
