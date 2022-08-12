import prisma from "@/lib/prismaClient"
import { Profile } from "@prisma/client"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const test = false

interface DashboardProps {
  profile: Profile
}

export default function Dashboard({ profile }: DashboardProps) {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    !profile ? router.replace("/setup") : setLoaded(true)
  }, [profile, router])

  if (!loaded) return <></>

  return (
    <section className="flex flex-col grow p-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <h2 className="text-xl font-mono font-semibold text-gray-500">
        Welcome{" "}
        <span className="bg-gradient-to-br from-fuchsia-500 to-indigo-700 bg-clip-text text-transparent">
          {profile?.username}
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

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const email = session?.user.email as string
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

  if (!profile) {
    return {
      redirect: {
        destination: "/dashboard/setup",
        permanent: false,
      },
    }
  }

  return {
    props: { profile }, // will be passed to the page component as props
  }
}
