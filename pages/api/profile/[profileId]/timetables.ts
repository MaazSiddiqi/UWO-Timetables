import prisma from "@lib/prismaClient"
import { Timetable } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

type ResponseData = {
  message: string
  timetables: Timetable[]
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    try {
      const profileId = req.query.profileId as string
      const timetables: Timetable[] = await prisma.timetable.findMany({
        where: {
          profileId: profileId,
        },
      })
      return res.status(200).send({
        message: `Found timetables for profile ${profileId}`,
        timetables,
      })
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Something went wrong", timetables: [], error })
    }
  }
}
