import { PrismaClient } from '@prisma/client'
import { getSession } from 'lib/iron'

const prisma = new PrismaClient()

export default async function user(req, res) {
  const session = await getSession(req)
  console.log('req.body')
  console.log(req.body)
  console.log('session')
  console.log(session)

  // const result = await prisma.user.findOne({
  //   where: {
  //     name: req.body.name,
  //   },
  // })

  // res.json(result)

  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case
  res.status(200).json({ user: session || null })
}
