import prisma from "@/lib/prismaClient"
import { Profile } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

interface ResponseData {
  profile?: Profile
  message: String
  error?: any
}

interface ProfileCreationRequest {
  email: string
  username?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  switch (req.method) {
    case "GET":
      return getProfile(req, res)
      break
    case "POST":
      return postProfile(req, res)

    default:
      break
  }
}

const getProfile = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  const profileID = req.query.profileID as string
  const profile = await prisma.profile.findUnique({
    where: { id: profileID },
  })
  profile
    ? res.status(200).send({
        profile: profile,
        message: "Profile retrieved successfully",
      })
    : res.status(404).send({ message: "Profile could not be found" })
}

const postProfile = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  try {
    const profileRequest: ProfileCreationRequest = req.body.profile || req.query
    console.log(`Incoming request to make a profile: `)
    console.log(profileRequest)

    const time = new Date()
    const profile = await prisma.profile.create({
      data: {
        email: profileRequest.email,
        username: profileRequest.username ? profileRequest.username : null,
        dateCreated: time.toISOString(),
      },
    })

    console.log("Profile created successfully")
    res.status(200).send({ profile, message: "Profile created successfully" })
  } catch (error) {
    console.log("ERROR: Profile creation request invalid, rejected")
    console.log(error)
    return res.status(400).send({ message: "Something went wrong", error })
  }
}
