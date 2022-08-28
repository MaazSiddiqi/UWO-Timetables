import prisma from "@lib/prisma"
import { Timetable } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

interface TimetableCreationRequest extends NextApiRequest {
  body: { name: string }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return getTimetable(req, res)
    case "POST":
      return createTimetable(req, res)
    default:
      return res
        .status(405)
        .send({ message: "Method not allowed", timetables: [] })
  }
}

async function getTimetable(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profileId = req.query.profileId as string

    const timetables = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { timetables: true },
    })

    return res.status(200).send({
      message: `Found timetables for profile`,
      profileId,
      timetables,
    })
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something went wrong", timetables: [], error })
  }
}
async function createTimetable(
  req: TimetableCreationRequest,
  res: NextApiResponse,
) {
  try {
    const profileId = req.query.profileId as string
    const { name } = req.body

    const timetable = await prisma.timetable.create({
      data: {
        name,
        profileId,
      },
    })

    return res.status(200).send({
      message: "Created timetable for profile",
      profileId,
      timetable,
    })
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something went wrong", timetable: {}, error })
  }
}
