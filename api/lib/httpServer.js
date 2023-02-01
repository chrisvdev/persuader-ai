import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes.js'

const httpServer = express()

httpServer.use(morgan('dev'))
httpServer.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
httpServer.use(express.json())
httpServer.use(express.urlencoded({ extended: true }))
httpServer.use(cors())
httpServer.use('/', express.static('../app/dist'))
httpServer.use('/', router)

export default httpServer

/*

* I've did the for sentence because cohere could delay to much sometimes and a parallel call generally
get a most quick response. Yes! i Know, is bad coding but i don't want to wait for the free version
of the api, no matter if it means use more calls

*/
