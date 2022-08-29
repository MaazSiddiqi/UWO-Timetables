import { Timetable } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"
import prisma from "@lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      return addCourse(req, res)
    default:
      return res
        .status(405)
        .send({ message: "Method not allowed", timetables: [] })
  }
}

interface AddCourseRequest extends NextApiRequest {
  body: {
    classId: string
  }
}

async function addCourse(
  req: AddCourseRequest,
  res: NextApiResponse<{ message: string; error?: string }>,
) {
  const { classId } = req.body
  const timetableId = req.query.timetableId as string
  const add = await prisma.classInTimetable
    .create({
      data: {
        classId,
        timetableId,
      },
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).send({ message: "Something went wrong", error })
    })

  return res.status(200).send({
    message: `Added class ${classId} to timetable ${timetableId}`,
  })
}
