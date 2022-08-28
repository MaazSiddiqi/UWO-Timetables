import prisma from "@lib/prisma"
import { Timetable } from "@prisma/client"
import { getSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/router"

const test = false

const Dashboard: React.FC<{
  id: string
  username: string
  email: string
  timetables: Timetable[]
}> = ({ id, username, email, timetables }) => {
  const router = useRouter()

  const createTimetable = async () => {
    const timetable = await fetch(`/api/profile/${id}/timetables`, {
      method: "POST",
      body: JSON.stringify({ name: "test" }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      router.replace(router.asPath) // reload page
    })
  }

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

      <div>
        <div className="flex space-x-2 items-center">
          <h2 className="text-lg font-mono font-semibold text-gray-500">
            Timetables
          </h2>
          <button
            onClick={() => {
              createTimetable()
            }}
            className="btn rounded-full h-8 w-8 bg-fuchsia-500 text-slate-50"
          >
            +
          </button>
        </div>
        <div>
          {timetables.map((timetable) => (
            <div key={timetable.id}>{timetable.name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Dashboard

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

  const email = session.user.email as string
  const profile = await prisma.profile.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      timetables: true,
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
    props: { ...profile }, // will be passed to the page component as props
  }
}
