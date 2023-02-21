//custom middleware
import jwt from 'jsonwebtoken'

// export const auth = (req, res, next) => {
//     try{const token = req.header('x-auth-token')
//   console.log(token)
//   jwt.verify(token,(process.env.SECRET_KEY))
//   next()}
//   catch(err){
//     res.send({error: err.message})
//   }

// }

// Middleware to verify JWT token
export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send('Access token not found')
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).send('Access token is invalid')
  }
}
