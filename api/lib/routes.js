import { Router } from 'express'
import { generateClickbait, generateCTA } from '../services/cohere-service.js'

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
    generateClickbait(req.body.input, req.body.quantity)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})
router.post('/api/cta', (req, res) => {
  if (noNeededInfo(req.body.input, req.body.quantity)) res.status(400).send({ error: 'missing or wrong data.' })
  else {
    generateCTA(req.body.input, req.body.quantity)
      .then((result) => res.status(200).json(result))
      .catch(() => res.status(503).json(['AI Service error']))
  }
})

export default router
