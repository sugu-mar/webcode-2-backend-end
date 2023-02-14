import express from 'express'
import * as dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import { userdataRouter } from './routes/userdata.js'
import bcrypt from 'bcrypt'
import { usersRouter } from './routes/user.js'
// import {
//   getAllData,
//   getDataById,
//   AddData,
//   DeleteDataById,
//   EditData,
// } from './helper.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

async function createConnection() {
  const client = new MongoClient(MONGO_URL)
  await client.connect()
  console.log('Mongo is connected')
  return client
}

export const client = await createConnection()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

// app.get('/userdata', (req, res) => {
//   res.send(data)
// })

//get user by id
// app.get('/userdata/:id', (req, res) => {
//   const { id } = req.params

//   console.log(id)
//   const userData = userDatas.filter((ud) => ud.id == id)[0]
//   res.send(userData)
// })

//get all userdata
app.use('/userdata', userdataRouter)

app.use('/user', usersRouter)

app.listen(PORT, () => console.log('server started on port', PORT))

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10)
  console.log(salt)
  const hashedPassword = await bcrypt.hash(password, salt)
  //console.log(hashedPassword)
}

//console.log(genPassword('password@123'))
//promise pending