import express from 'express'
import { genPassword, createUser, getUserByName } from '../helper.js'
const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const isuserExist = await getUserByName(username)
  console.log(isuserExist)

  //username already exist
  if (isuserExist0) {
    res.status(400).send({ message: 'username already taken' })
  }
  const hashedPassword = await genPassword(password)
  const result = await createUser(username, hashedPassword)
  res.send(result)
})

export const usersRouter = router

//validate if username already present

// validate if password matches

//store the user details -user collection user name & password
