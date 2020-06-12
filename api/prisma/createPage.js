const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { title, content, url, theme } = req.body

  const result = await prisma.page.create({
    data: {
      title,
      content,
      url,
      theme
    }
  })
  res.json(result)
}
