import express from 'express'
import { createVandor, getVandor, getVandors } from '../controller'

const router = express()

router.get('/vandor/:id', getVandor)

router.post('/vandor',createVandor)

router.get('/vandors', getVandors)

export {router as VandorRoutes}