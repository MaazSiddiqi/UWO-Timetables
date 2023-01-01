import { getClasses } from "./../../../../services/courses"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET": //TODO change to GET
      return findClasses(req, res)
    default:
      return res.status(405).send({ message: "Method not allowed" })
  }
}
async function findClasses(req: NextApiRequest, res: NextApiResponse) {
  const { courseId } = req.query

  const classes = await getClasses(courseId as string)

  return res.status(200).send({ classes })
}
