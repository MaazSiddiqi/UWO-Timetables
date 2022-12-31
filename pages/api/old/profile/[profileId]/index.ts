import prisma from "@lib/prisma"
import { Profile } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next/types"
import { getSession } from "next-auth/react"

type ResponseData = {
  profile?: Profile
  message: string
  error?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { profileId } = req.query
  if (req.method === "GET") {
    res.status(200).send("GET request to profile, profileId: " + profileId)
  }
}
