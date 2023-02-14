import express from 'express'
import { genPassword, createUser, getUserByName } from '../helper.js'
const router = express.Router()
import bcrypt from 'bcrypt'

// it will watch whether user provides necessary data for signup
router.post('/signup', async (req, res) => {
  const { username, firstName, lastName, password } = req.body
  // console.log(firstName, lastName, username, password)
  const isuserExist = await getUserByName(username)
  // console.log(isuserExist)

  // username already exist then it will show error message
  if (isuserExist) {
    res.status(400).send({
      message: 'username already taken',
    })
    return
  }
  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password,
    )
  ) {
    res.status(400).send({
      message: 'Password pattern does not match',
    })
    return
  }

  // if user name is unique not present in the server then this function will triggers two function 1. genPassword function and 2. createUser
  const hashedPassword = await genPassword(password)
  const result = await createUser(username, firstName, lastName, hashedPassword)
  res.send(result)
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  // console.log(firstName, lastName, username, password)
  const userFromDB = await getUserByName(username)
  console.log(userFromDB)

  // username already exist then it will show error message
  if (!userFromDB) {
    res.status(400).send({
      message: 'Invalid Credential',
    })
    return
  }

  const storedDbPassword = userFromDB.password

  const isPasswordMatch = await bcrypt.compare(password, storedDbPassword)
if(!isPasswordMatch){res.status(400).send({message:"Invalid Credentials"})
return;
}
res.send(isPasswordMatch)

  // res.send(result)
});

export const usersRouter = router

//validate if username already present

// validate if password matches

//store the user details -user collection user name & password
