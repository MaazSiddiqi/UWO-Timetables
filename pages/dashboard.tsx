import { getSession, signIn } from "next-auth/react"
import prisma from "@lib/prismaClient"
import { Profile } from "@prisma/client"
import { useMemo } from "react"

const test: boolean = true

interface DashboardProps {
  profile: Profile
}

export default function Dashboard({ profile }: DashboardProps) {
  const { id, email, username, timetables } = useMemo(() => profile, [profile])

  return (
    <section className="flex flex-col grow p-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <h2 className="text-xl font-mono font-semibold text-gray-500">
        Welcome{" "}
        <span className="bg-gradient-to-br from-fuchsia-500 to-indigo-700 bg-clip-text text-transparent">
          {username}
        </span>
        !
      </h2>

      <div className="flex space-x-2 items-center">
        <h2 className="text-lg font-mono font-semibold text-gray-500">
          Timetables
        </h2>
        <button
          onClick={() => {}}
          className="btn rounded-full h-8 w-8 bg-fuchsia-500 text-slate-50"
        >
          +
        </button>
      </div>

      <div className="text-xs pt-48">
        <p>Profile: </p>
        <pre>{JSON.stringify(profile)}</pre>
      </div>
    </section>
  )
}

export async function getServerSideProps(context: any) {
  if (test) {
    const profile = await prisma.profile.findUnique({
      where: { email: "maazali22@gmail.com" },
      select: {
        id: true,
        email: true,
        username: true,
        timetables: true,
      },
    })

    console.log(profile)

    return {
      props: {
        profile,
      },
    }
  }

  const session = await getSession(context)
  console.log(session)

  if (!session) {
    const { res } = context
    res.setHeader("location", "/api/auth/signin")
    res.statusCode = 401
    res.end()
    return { props: {} }
  }

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
    props: { profile }, // will be passed to the page component as props
  }
}
