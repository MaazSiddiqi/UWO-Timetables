import { getTimetableById } from "./../../../../../../services/timetable"
import { TimetableValue } from "@features/activeTimetable"
import prisma from "@lib/prisma"
import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return removeCourse(req, res)
    default:
      return res
        .status(405)
        .send({ message: "Method not allowed", timetable: null })
  }
}

interface AddCourseRequest extends NextApiRequest {
  body: {
    classId: string
  }
}

async function removeCourse(
  req: AddCourseRequest,
  res: NextApiResponse<{
    message: string
    timetable: TimetableValue | null
    error?: string
  }>,
) {
  const session = await getSession()
  const { classId } = req.body
  const { profileId, timetableId } = req.query as {
    timetableId: string
    profileId: string
  }

  // if (!session) return res.status(401).send({ message: "Unauthorized" })

  // if (session.profile?.id !== profileId)
  //   return res.status(401).send({ message: "Unauthorized" })

  // if (!classId) return res.status(400).send({ message: "Missing classId" })

  const remove = await prisma.classInTimetable
    .delete({
      where: {
        classId_timetableId: {
          classId,
          timetableId,
        },
      },
    })
    .catch((error) => {
      console.log(error)
      return res
        .status(400)
        .send({ message: "Something went wrong", timetable: null, error })
    })

  const timetable = await getTimetableById(timetableId)
  if (!timetable)
    return res
      .status(404)
      .send({ message: "Could not find timetable", timetable })

  return res.status(200).send({
    message: `Added class ${classId} to timetable ${timetableId}`,
    timetable,
  })
}
