const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default function handler(req, res) {
  const posts = prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
}
