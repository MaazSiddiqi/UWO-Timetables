import prisma from "@lib/prisma"
import { NextApiRequest, NextApiResponse } from "next/types"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const key = (req.body.key as string) ?? (req.query.key as string)

  console.log(process.env.DATABASE_ADMIN_SECRET)

  if (key !== process.env.DATABASE_ADMIN_SECRET) {
    return res.status(401).send({
      message: "nice try lol",
    })
  }

  const deleteClasses = await prisma.class.deleteMany({})
  const deleteCourses = await prisma.course.deleteMany({})
  const deleteSubjects = await prisma.subject.deleteMany({})

  res.status(200).send({ message: "Reset DB data" })
}
