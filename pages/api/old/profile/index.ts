import prisma from "@lib/prisma"
import { Profile } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"

interface ResponseData {
  message: string
  profile?: Profile
  error?: any
  input?: any
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
      return res.status(405).send({ message: "Method not allowed" })
  }
}

const getProfile = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  const profileID = req.body.profileID as string
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

interface ProfileCreationRequest extends NextApiRequest {
  body: { email: string; username: string }
}

const postProfile = async (
  req: ProfileCreationRequest,
  res: NextApiResponse<ResponseData>,
) => {
  try {
    const { email, username } = req.body
    console.log(`Incoming request to create profile with email ${email}`)

    const profile = await prisma.profile.create({
      data: {
        email,
        username,
      },
    })

    console.log("Profile created successfully")
    res.status(200).send({ profile, message: "Profile created successfully" })
  } catch (error) {
    console.log("Error creating profile", error)
    return res
      .status(400)
      .send({ message: "Something went wrong", input: req.body, error })
  }
}
