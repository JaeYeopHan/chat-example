import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import flash from 'express-flash'
import cors from 'cors'
import * as userController from './controllers/user'
import * as chatController from './controllers/chat'

const app = express()

app.use(cors())

app.set('port', process.env.PORT || 8000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(flash())

app.post('/login', userController.login)
app.post('/logout', userController.logout)
app.get('/chatrooms', chatController.getChatRooms)
app.post('/chatrooms', chatController.createChatRoom)
app.post('/chatrooms/invite', chatController.inviteUserToRoom)

export default app
