import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";

import {adminRoutes, VandorRoutes} from './routes'
import { MONGO_URI } from "./config";

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use(adminRoutes)
app.use(VandorRoutes)


app.listen(8000, () => {
    mongoose.connect(MONGO_URI)
    console.log('app is listening on port 8000')
})