import { NextApiRequest, NextApiResponse } from "next/types"
import prisma from "@lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return changeName(req, res)
    default:
      return res
        .status(405)
        .send({ message: "Method not allowed", timetables: [] })
  }
}
async function changeName(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body

  const timetableId = req.query.timetableId as string

  try {
    const timetable = await prisma.timetable.update({
      where: { id: timetableId },
      data: { name },
    })

    return res.status(200).send({
      message: `Changed timetable ${timetableId} name to ${name}`,
      timetable,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Failed to change timetable ${timetableId} name to ${name}`,
      timetable: null,
    })
  }
}
