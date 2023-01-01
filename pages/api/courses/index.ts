import { searchCourses } from "./../../../services/courses"
import prisma from "@lib/prisma"
import { Course } from "@prisma/client"
import { CourseQuery } from "additional"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST": //TODO change to GET
      return getCourses(req, res)
    default:
      return res.status(405).send({ message: "Method not allowed" })
  }
}

async function getCourses(req: NextApiRequest, res: NextApiResponse) {
  const { subjectQuery, levelQuery, termQuery, nameQuery } =
    req.body as CourseQuery

  const courses = await searchCourses({
    subjectQuery,
    levelQuery,
    termQuery,
    nameQuery,
  })

  console.log({ courses })

  return res.status(200).send({ courses })
}
