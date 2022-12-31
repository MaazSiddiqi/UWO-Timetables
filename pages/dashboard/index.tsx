import DevTools from "@components/DevTools"
import prisma from "@lib/prisma"
import { Profile, Timetable } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"

const Dashboard: React.FC<Profile & { timetables: Timetable[] }> = ({
  id,
  username,
  email,
  timetables,
}) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
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
            <Link href="dashboard/createTimetable" passHref>
              <a className="btn rounded-full text-center h-6 w-6 bg-fuchsia-500 text-slate-50">
                +
              </a>
            </Link>
          </div>
          <div className="grid py-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
            {timetables.map((timetable) => (
              <a
                key={timetable.id}
                className="flex items-center justify-center btn rounded-xl w-full h-full p-2 cursor-pointer border-[1px]"
                href={`/dashboard/edit/${timetable.id}`}
              >
                <h3 className="min-h-[60px] text-center font-semibold text-slate-700 select-none">
                  {timetable.name}
                </h3>
              </a>
            ))}
          </div>
        </div>

        <DevTools>
          <pre>
            Props:{" "}
            <code>
              {JSON.stringify({ id, username, email, timetables }, null, 2)}
            </code>
          </pre>
        </DevTools>
      </section>
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session)
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }

  if (!session.profile)
    return {
      redirect: {
        destination: "/dashboard/setup",
        permanent: false,
      },
    }

  console.log(session.profile)

  return {
    props: session.profile,
  }
}
