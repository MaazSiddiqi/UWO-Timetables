import prisma from "@lib/prismaClient"
import { NextApiRequest, NextApiResponse } from "next/types"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).send({ message: "Reset DB data" })
}
