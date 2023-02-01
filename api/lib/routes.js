import { Router } from 'express'
import { generateClickbait, generateCTA } from '../services/cohere-service.js'
import promiseAny from './promise-any.js'

const router = Router()

function noNeededInfo (input, quantity) {
  if (!input || !quantity) return true
  if (input.length === 0) return true
  if (quantity < 1 || quantity > 5) return true
  return false
}
router.post('/api/clickbait', (req, res) => {
  if (noNeededInfo(req.body.input, req.body.quantity)) res.status(400).send({ error: 'missing or wrong data.' })
  else {
    const forcedRapidGet = []
    for (let i = 0; i < 3; i++) forcedRapidGet.push(generateClickbait(req.body.input, req.body.quantity)) // to understand this go to de * comment
    promiseAny(forcedRapidGet)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})
router.post('/api/cta', (req, res) => {
  if (noNeededInfo(req.body.input, req.body.quantity)) res.status(400).send({ error: 'missing or wrong data.' })
  else {
    const forcedRapidGet = []
    for (let i = 0; i < 3; i++) forcedRapidGet.push(generateCTA(req.body.input, req.body.quantity)) // to understand this go to de * comment
    promiseAny(forcedRapidGet)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})

export default router
