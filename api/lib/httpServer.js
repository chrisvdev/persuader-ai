import express from 'express'
import cors from 'cors'
import { generateClickbait, generateCTA } from '../services/cohere-service.js'
import promiseAny from './promise-any.js'

const httpServer = express()

httpServer.use(express.json())
httpServer.use(express.urlencoded({ extended: true }))
httpServer.use(cors())
httpServer.get('/', express.static('../app/dist'))
httpServer.get('/api/clickbait', (req, res) => {
  const forcedRapidGet = []
  for (let i = 0; i < 3; i++) forcedRapidGet.push(generateClickbait(req.body.input, req.body.quantity)) // to understand this go to de * comment
  promiseAny(forcedRapidGet)
    .then((result) => res.status(200).json(result))
    .catch(() => res.status(503).json(['AI Service error']))
})
httpServer.get('/api/cta', (req, res) => {
  const forcedRapidGet = []
  for (let i = 0; i < 3; i++) forcedRapidGet.push(generateCTA(req.body.input, req.body.quantity)) // to understand this go to de * comment
  promiseAny(forcedRapidGet)
    .then((result) => res.status(200).json(result))
    .catch(() => res.status(503).json(['AI Service error']))
})

export default httpServer

/*

I've did the for sentence because cohere could delay to much sometimes and a parallel call generally
get a most quick response. Yes! i Know, is bad coding but i don't want to wait for the free version
of the api, no matter if it means use more calls

*/
