import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function signup(req, res) {
  try {
    const result = await prisma.user.create({
      data: {
        name: req.body.name,
      },
    })

    res.json(result)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(500).end(error.message)
  }
}
