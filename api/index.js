// https://github.com/nuxt/nuxt.js/blob/dev/examples/auth-routes/api/index.js
import express from 'express'

import clearbitPersonHandler from './clearbit/person'
import clearbitCompanyHandler from './clearbit/company'

const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/clearbit/person/:email', (req, res) => {
  clearbitPersonHandler(req, res)
})

router.get('/clearbit/company/:domain', (req, res) => {
  clearbitCompanyHandler(req, res)
})

router.get('/hi', (req, res) => {
  res.status(200).json({ ok: true })
})

export default {
  path: '/api',
  handler: router
}
