import prisma from "@lib/prismaClient"
import { getSession } from "next-auth/react"

export default function Home({ session, profile }: any) {
  return <div>User Homepage</div>
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  console.log(session)

  const email = session?.user.email || ""
  const profile = await prisma.profile.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  })
  console.log(profile)

  if (!profile) {
    const { res } = context
    res.setHeader("location", "/setup")
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  return {
    props: { session, profile }, // will be passed to the page component as props
  }
}
