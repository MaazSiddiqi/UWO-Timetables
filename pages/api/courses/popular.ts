import { popularCourses } from "@services/courses"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return getPopularCourses(req, res)
    default:
      return res.status(405).send({ message: "Method not allowed" })
  }
}

async function getPopularCourses(req: NextApiRequest, res: NextApiResponse) {
  const popular = await popularCourses()
  return res.status(200).send({ courses: popular })
}
