import Head from "next/head"
import { useEffect, useState } from "react"
import Timetable from "../components/timetable"
import AddCourses from "../components/addCourse"
import calcSubjects from "../public/CALCULUS.json"

const sampleUser = {
  name: "Maaz Siddiqi",
  timetables: [
    {
      name: "My fall draft",
      courses: [
        [calcSubjects["Courses"][0], 2],
        [calcSubjects["Courses"][5], 0],
        [calcSubjects["Courses"][7], 0],
      ],
    },
  ],
}

export default function Home() {
  const [user, setUser] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setUser(sampleUser)
      setLoaded(true)
    }, 500)
  }, [])

  return (
    <>
      <Head>
        <title>uPlanned</title>
      </Head>
      <div className="flex space-y-16 space-x-3  w-screen p-16 bg-slate-50">
        <div className="w-1/3 py-16">
          <AddCourses />
        </div>

        <div
          className={`flex flex-col space-y-2 overflow-hidden p-4 text-center drop-shadow-md rounded-2xl w-10/12 bg-white`}
        >
          {loaded ? (
            <>
              <h1 className="text-2xl font-semibold">
                {user["timetables"][0]["name"]}
              </h1>
              <Timetable courses={user["timetables"][0]["courses"]} />
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  )
}
