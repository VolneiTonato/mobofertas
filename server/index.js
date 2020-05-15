import './midleware/env'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'
import Logger from 'bunyan'
import methodOverride from 'method-override'
import serverStatic from 'serve-static'
import path from 'path'
import favicon from 'serve-favicon'
import limitRate from './midleware/redis-limiter'

const app = express()

const log = Logger.createLogger({ name: 'site-mobofertas' })

app.use(compress())
app.use(helmet())

app.use(methodOverride())

app.disable('x-powered-by')

app.use(cors({credentials:true, origin:true}))

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
app.use(cookieParser())

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


app.use(serverStatic(path.join(__dirname, 'public'), {dotfiles:"deny", index:false}))

app.use('*', limitRate, serverStatic(path.join(__dirname, 'public'), {dotfiles:"deny", index:['index.html'], }))


app.on('emit', (data) => {
    log.info(data)
})

const server = app.listen(process.env.PORT)


server.on('listening', () => {
    log.info(`Server site on`)
})

server.on('error', (err) => {
    log.info(`Server site error`)
})