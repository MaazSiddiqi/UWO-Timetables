import prisma from "@lib/prismaClient"
import { Profile } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next/types"
import { getSession } from "next-auth/react"

type ResponseData = {
  profile?: Profile
  message: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {}
