import prisma from "@lib/prisma"
import { Timetable } from "@prisma/client"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

interface TimetableCreationRequest extends NextApiRequest {
  body: { name: string }
}

interface TimetableCreationResponse {
  message: string
  timetable: Timetable | null
  error?: unknown
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

    const userTimetables = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { timetables: true },
    })

    return res.status(200).send({
      message: `Found timetables for ${profileId}`,
      timetables: userTimetables,
    })
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something went wrong", timetables: [], error })
  }
}
async function createTimetable(
  req: TimetableCreationRequest,
  res: NextApiResponse<TimetableCreationResponse>,
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
      timetable,
    })
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Something went wrong", timetable: null, error })
  }
}
