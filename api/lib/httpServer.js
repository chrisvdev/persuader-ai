import express from 'express'
import cors from 'cors'
// import morgan from 'morgan'
import { generateClickbait, generateCTA } from '../services/cohere-service.js'
import promiseAny from './promise-any.js'

const httpServer = express()

// httpServer.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
httpServer.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
httpServer.use(express.json())
httpServer.use(express.urlencoded({ extended: true }))
httpServer.use(cors())
httpServer.get('/', express.static('../app/dist'))
function noNeededInfo (input, quantity) {
  if (!input || !quantity) return true
  if (input.length === 0) return true
  if (quantity < 1 || quantity > 5) return true
  return false
}
httpServer.post('/api/clickbait', (req, res) => {
  if (noNeededInfo(req.body.input, req.body.quantity)) res.status(400).send({ error: 'missing or wrong data.' })
  else {
    const forcedRapidGet = []
    for (let i = 0; i < 3; i++) forcedRapidGet.push(generateClickbait(req.body.input, req.body.quantity)) // to understand this go to de * comment
    promiseAny(forcedRapidGet)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})
httpServer.post('/api/cta', (req, res) => {
  if (noNeededInfo(req.body.input, req.body.quantity)) res.status(400).send({ error: 'missing or wrong data.' })
  else {
    const forcedRapidGet = []
    for (let i = 0; i < 3; i++) forcedRapidGet.push(generateCTA(req.body.input, req.body.quantity)) // to understand this go to de * comment
    promiseAny(forcedRapidGet)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})

export default httpServer

/*

* I've did the for sentence because cohere could delay to much sometimes and a parallel call generally
get a most quick response. Yes! i Know, is bad coding but i don't want to wait for the free version
of the api, no matter if it means use more calls

*/
