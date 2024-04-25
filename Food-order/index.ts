import express from "express";

import {adminRoutes, VandorRoutes} from './routes'

const app = express()

app.use(adminRoutes)
app.use(VandorRoutes)


app.listen(8000, () => {
    console.log('app is listening on port 8000')
})