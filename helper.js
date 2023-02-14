import { client } from './index.js'
import bcrypt from 'bcrypt'

export async function getAllData() {
  return await client.db('crmdata').collection('userdata').find({}).toArray()
}
export async function getDataById(id) {
  return await client.db('crmdata').collection('userdata').findOne({ id: id })
}
export async function AddData(newData) {
  return await client.db('crmdata').collection('userdata').insertMany(newData)
}
export async function DeleteDataById(id) {
  return await client.db('crmdata').collection('userdata').deleteOne({ id: id })
}
export async function EditData(id, updatedata) {
  return await client
    .db('crmdata')
    .collection('userdata')
    .updateOne({ id: id }, { $set: updatedata })
}

// export async function genPassword(password) {
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10)
  console.log(salt)
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log(hashedPassword)
  return hashedPassword
}
// }
export async function createUser(username, hashedPassword) {
  return await client
    .db('crmdata')
    .collection('users')
    .insertOne({ username: username, password: hashedPassword })
}

export async function getUserByName(username) {
  return await client
    .db('crmdata')
    .collection('users')
    .findOne({ username: username })
}

console.log(genPassword('password@123'))
// }
