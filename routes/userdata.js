import express from 'express'
import {
  getAllData,
  getDataById,
  AddData,
  DeleteDataById,
  EditData,
} from '../helper.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await getAllData()
  data ? res.send(data) : res.status(404).send({ message: 'No userdata found' })
})

//get user data by id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const data = await getDataById(id)
  data ? res.send(data) : res.status(404).send({ message: 'No userdata found' })
})

//add user data 
router.post('/', async (req, res) => {
  const newData = req.body
  const result = await AddData(newData)
  result
    ? res.send(result)
    : res.status(404).send({ message: 'No userdata added' })
})

// delete data by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const data = await DeleteDataById(id)

  data
    ? res.send(data)
    : res.status(404).send({ message: 'No userdata found ' })
})


// edit data by id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedata = req.body
  // console.log(updatedata)
  const result = await EditData(id, updatedata)
  res.send(result)
})

export const userdataRouter = router
