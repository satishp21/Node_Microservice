import express , {Request, Response, NextFunction} from 'express'

const router = express()

router.get('/admin' , (req, res)=> {
    return res.status(200).json('this is response from admin')
})

export {router as adminRoutes}