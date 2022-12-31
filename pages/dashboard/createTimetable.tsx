import { Profile, Timetable } from "@prisma/client"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const CreateTimetable: React.FC<Profile & { timetables: Timetable[] }> = ({
  id,
}) => {
  const [timetableName, setTimetableName] = useState("")
  const router = useRouter()

  const createTimetable = useCallback(async () => {
    const timetable = await fetch(`/api/profile/${id}/timetables`, {
      method: "POST",
      body: JSON.stringify({ name: timetableName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (res) =>
          res.json() as Promise<{
            message: string
            timetable: Timetable | null
          }>,
      )
      .then((res) => res.timetable)
      .catch((err) => {
        console.log(err)
        return null
      })

    if (!timetable) return console.log("Failed to create timetable")

    return router.replace(`/dashboard/edit/${timetable.id}`)
  }, [id, router, timetableName])

  return (
    <div className="grid place-items-center grow">
      <div className="p-16 shadow-lg rounded-xl space-y-6 text-left">
        <h1 className="text-2xl font-bold">Lets setup your timetable</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (timetableName !== "") return createTimetable()
          }}
          className="flex flex-col space-y-4"
        >
          <div className="space-y-1">
            <label htmlFor="name" className="p-1 text-indigo-600">
              name
            </label>
            <input
              value={timetableName}
              onChange={(e) => setTimetableName(e.target.value)}
              type="text"
              placeholder="name"
              className="w-full py-2 px-3 drop-shadow-md rounded-lg outline-0 text-gray-500 font-mono hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full btn bg-purple-500 px-4 py-1 rounded-full text-slate-100 text-center text-sm font-mono font-light hover:bg-white hover:text-slate-800 active:shadow-inner active:bg-gray-100 transition-all duration-150"
          >
            create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTimetable

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  if (!session.profile) {
    return {
      redirect: {
        destination: "/dashboard/setup",
        permanent: true,
      },
    }
  }

  return {
    props: session.profile,
  }
}
