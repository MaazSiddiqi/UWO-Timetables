import prisma from "@lib/prisma"
import { Course } from "@prisma/client"
import { CourseQuery } from "additional"
import { NextApiRequest, NextApiResponse } from "next/types"

const MAX_QUERY_SIZE = 5

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return getCourses(req, res)
    default:
      return res.status(405).send({ message: "Method not allowed" })
  }
}

async function getCourses(req: NextApiRequest, res: NextApiResponse) {
  const { subjectQuery, levelQuery, termQuery, nameQuery } =
    req.body as CourseQuery

  const courses = await prisma.course.findMany({})

  const checkCourse = (course: Course) =>
    (!!subjectQuery ? course.subjectCode === subjectQuery : true) &&
    (!!levelQuery ? course.level === levelQuery : true) &&
    (!!termQuery ? course.term === termQuery : true) &&
    (!!nameQuery ? course.title === nameQuery : true)

  const query: Course[] = []

  while (query.length < MAX_QUERY_SIZE && courses.length > 0) {
    const course = courses.pop() as Course
    if (checkCourse(course)) query.push(course)
  }

  return res.status(200).send({ courses: query })
}
