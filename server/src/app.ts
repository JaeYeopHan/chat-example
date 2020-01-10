import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import cors from 'cors'
import * as userController from './controllers/user'

const app = express()
app.use(cors())

app.set('port', process.env.PORT || 8000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(flash())

app.post('/login', userController.login)

export default app
