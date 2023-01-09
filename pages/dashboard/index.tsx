import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useCallback, useState } from "react"

import DevTools from "@components/DevTools"
import TTName from "@components/timetableGraph/TTName"
import { TimetableValue } from "@features/activeTimetable"
import { Profile, Timetable } from "@prisma/client"

const Dashboard: React.FC<Profile & { timetables: Timetable[] }> = ({
  id,
  username,
  email,
  timetables: _timetables,
}) => {
  const [timetables, setTimetables] = useState(_timetables)
  const [editingName, setEditingName] = useState(false)

  const deleteTimetable = useCallback(
    async (ttId: string) => {
      const res = await fetch(`/api/profile/${id}/timetables/${ttId}`, {
        method: "DELETE",
      })

      if (res.status === 200) {
        setTimetables((prev) => prev.filter((tt) => tt.id !== ttId))
      } else {
        alert("Failed to delete timetable")
      }
    },
    [id],
  )

  const updateName = useCallback(
    async (newName: string, ttId: string) => {
      const updatedTT = await fetch(
        `/api/profile/${id}/timetables/${ttId}/changeName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        },
      )
        .then((res) => res.json())
        .then((data) => data.timetable as TimetableValue)
        .catch((error) => {
          console.log(error)
          return null
        })
      if (!updatedTT) {
        alert("Error updating timetable name")
        return setEditingName(false)
      }

      setTimetables((prev) =>
        prev.map((tt) => (tt.id === ttId ? updatedTT : tt)),
      )
    },
    [id],
  )

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
            <Link
              href="dashboard/createTimetable"
              className="btn rounded-full text-center h-6 w-6 bg-fuchsia-500 text-slate-50"
            >
              +
            </Link>
          </div>
          <div className="grid py-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2">
            {timetables.map((timetable) => (
              <div
                key={timetable.id}
                className="relative group btn rounded-xl shadow-md w-full h-20 p-2 cursor-pointer  hover:bg-slate-50"
              >
                <Link
                  className="w-full h-full flex items-center justify-center text-center font-semibold text-slate-700 select-none"
                  href={`/dashboard/edit/${timetable.id}`}
                >
                  <h3>{timetable.name}</h3>
                </Link>
                <button
                  className="group-hover:visible invisible absolute top-1/2 -translate-y-1/2 right-4 card bg-white hover:bg-red-50 active:bg-red-100 btn"
                  onClick={() => {
                    deleteTimetable(timetable.id)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  className="group-hover:visible invisible absolute top-1/2 -translate-y-1/2 right-[3.25rem] card bg-white hover:bg-blue-50 active:bg-blue-100 disabled:bg-blue-50 btn"
                  onClick={() => {
                    setEditingName(true)
                  }}
                  disabled={editingName}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                {editingName && (
                  <div className="absolute bottom-0 translate-y-[110%] left-1/2 -translate-x-1/2">
                    <TTName
                      onFinished={(newName) => {
                        setEditingName(false)
                        updateName(newName, timetable.id)
                      }}
                      onEscape={() => {
                        setEditingName(false)
                      }}
                      initOnEdit={true}
                    />
                  </div>
                )}
              </div>
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

  return {
    props: session.profile,
  }
}
