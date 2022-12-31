import { NextApiRequest, NextApiResponse } from "next/types"

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
function getCourses(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({ courses: [] })
}
