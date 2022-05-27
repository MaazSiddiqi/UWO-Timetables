import prisma from "@lib/prismaClient"
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
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    try {
      const profileId = req.query.profileId as string
      console.log(`Incoming fetch request for profile ${profileId}`)

      const profile = await prisma.profile.findUnique({
        where: { id: profileId },
      })

      if (profile) {
        return res.status(200).send({ message: "Found profile", profile })
      }

      res
        .status(404)
        .send({ message: `Could not find a profile with ID ${profileId}` })
    } catch (error) {
      res.status(400).send({ message: "Something went wrong", error })
    }
  }
}
