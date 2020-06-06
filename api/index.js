import express from 'express'

import clearbitPerson from './clearbit/person'
import clearbitCompany from './clearbit/company'
import clubhouseProjects from './clubhouse/projects'
import clubhouseStories from './clubhouse/stories'

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
  clearbitPerson(req, res)
})

router.get('/clearbit/company/:domain', (req, res) => {
  clearbitCompany(req, res)
})

router.get('/clubhouse/projects', (req, res) => {
  clubhouseProjects(req, res)
})

router.get('/clubhouse/stories', (req, res) => {
  clubhouseStories(req, res)
})

router.get('/hi', (req, res) => {
  res.status(200).json({ ok: true })
})

export default {
  path: '/api',
  handler: router
}
