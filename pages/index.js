import Head from "next/head"
import { useEffect, useState } from "react"
import Timetable from "../components/timetable"
import calcSubjects from "../public/CALCULUS.json"

const sampleUser = {
  name: "Maaz Siddiqi",
  courses: [
    [calcSubjects["Courses"][0], 2],
    [calcSubjects["Courses"][5], 0],
    [calcSubjects["Courses"][7], 0],
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
      <div className="grid place-items-center w-screen p-16 bg-slate-50">
        {loaded && <Timetable courses={user["courses"]} />}
      </div>
    </>
  )
}
