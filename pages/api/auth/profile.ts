import prisma from "@lib/prismaClient"
import { Profile } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

type ResponseData = {
  profile?: Profile
  message: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const session = await getSession()
  const email = session?.user.email
  if (!email) {
    res.status(404).json({ message: "No user signed in" })
  }

  console.log(req)

  //   const profile = await prisma.profile.create({
  //     data: {},
  //   })
  res.status(200).json({ message: "Created profile" })
}
