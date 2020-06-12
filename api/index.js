import express from 'express'

import clearbitPerson from './clearbit/person'
import clearbitCompany from './clearbit/company'
import clubhouseProjects from './clubhouse/projects'
import clubhouseStories from './clubhouse/stories'
import prismaCreatePage from './prisma/createPage'
import prismaFeed from './prisma/feed'

const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/hi', (req, res) => res.status(200).json({ ok: true }))

router.get('/clearbit/company/:domain', clearbitCompany)
router.get('/clearbit/person/:email', clearbitPerson)

router.get('/clubhouse/projects', clubhouseProjects)
router.get('/clubhouse/stories', clubhouseStories)

router.post('/prisma/pages', prismaCreatePage)
router.get('/prisma/pages/create', prismaCreatePage)
router.get('/prisma/feed', prismaFeed)

export default {
  path: '/api',
  handler: router
}
