import errorHandler from 'errorhandler'

import app from './app'

app.use(errorHandler())

const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env'),
  )
  console.log('  Press CTRL-C to stop\n')
})

const io = require('socket.io').listen(server)

io.origins('*:*') // for latest version
io.on('connection', function(socket: any) {
  console.log('a user connected')
})

export default server
