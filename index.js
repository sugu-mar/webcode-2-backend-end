import express from 'express'
import { MongoClient } from 'mongodb'
const app = express()

import * as dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

async function createConnection() {
  const client = new MongoClient(MONGO_URL)
  await client.connect()
  console.log('Mongo is connected')
  return client
}

const client = await createConnection()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world')
})

//get all user data
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

app.get('/userdata', async (req, res) => {
  const data = await client
    .db('crmdata')
    .collection('userdata')
    .find({})
    .toArray()
  data ? res.send(data) : res.status(404).send({ message: 'No userdata found' })
})

//get particular userdata by using id

app.get('/userdata/:id', async (req, res) => {
  const { id } = req.params
  const data = await client
    .db('crmdata')
    .collection('userdata')
    .findOne({ id: id })
  data ? res.send(data) : res.status(404).send({ message: 'No userdata found' })
})

app.post('/userdata', async (req, res) => {
  const newData = req.body
  const result = await client
    .db('crmdata')
    .collection('userdata')
    .insertMany(newData)
  result
    ? res.send(result)
    : res.status(404).send({ message: 'No userdata added' })
})

//delete particular user data
app.delete('/userdata/:id', async (req, res) => {
  const { id } = req.params
  const data = await client
    .db('crmdata')
    .collection('userdata')
    .deleteOne({ id: id })
  console.log(data)
  data
    ? res.send(data)
    : res.status(404).send({ message: 'No userdata found ' })
})

//update userdata

app.put('/userdata/:id', async (req, res) => {
  const { id } = req.params;
  const updatedata = req.body;
  console.log(updatedata);
  const result = await client
    .db('crmdata')
    .collection('userdata')
    .updateOne({id:id}, { $set: updatedata });
  res.send(result);
})

app.listen(PORT, () => console.log('server started on port', PORT))
