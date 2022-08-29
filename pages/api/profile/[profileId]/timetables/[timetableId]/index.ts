import { NextApiRequest, NextApiResponse } from "next/types"
import prisma from "@lib/prisma"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return getTimetable(req, res)
    default:
      return res
        .status(405)
        .send({ message: "Method not allowed", timetables: [] })
  }
}

const getTimetable = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const timetableId = req.query.timetableId as string

    const timetable = await prisma.timetable.findUnique({
      where: { id: timetableId },
    })

    return res.status(200).send({
      message: `Found timetable ${timetableId} for profile ${timetable?.profileId}`,
      timetable,
    })
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something went wrong", timetable: null, error })
  }
}
