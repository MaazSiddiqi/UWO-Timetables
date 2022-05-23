import AddCourses from "@/components/addCourses/addCourse"
import Navbar from "@/components/navbar/NavBar"
import Timetable from "@/components/timetableGraph/timetable"
import TTName from "@/components/timetableGraph/TTName"
import { setName, setTT } from "@features/activeTT"
import { login } from "@features/user"
import { useAppDispatch, useAppSelector } from "@hooks/redux"
import Head from "next/head"
import { useEffect, useState } from "react"
import calcSubjects from "../public/CALCULUS.json"
const sampleUser: User = {
  name: "Maaz Siddiqi",
  timetables: [
    {
      name: "My fall draft",
      courses: [
        {
          title: calcSubjects["Courses"][0]["Name"],
          component: calcSubjects["Courses"][0]["Components"][1],
        },
        {
          title: calcSubjects["Courses"][1]["Name"],
          component: calcSubjects["Courses"][1]["Components"][0],
        },
        {
          title: calcSubjects["Courses"][9]["Name"],
          component: calcSubjects["Courses"][9]["Components"][0],
        },
        {
          title: calcSubjects["Courses"][1]["Name"],
          component: calcSubjects["Courses"][1]["Components"][2],
        },
      ],
    },
  ],
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const user = useAppSelector((state) => state.user.value)
  const { name: activeName, courses: activeCourses } = useAppSelector(
    (state) => state.activeTT.value,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(login(sampleUser))
      dispatch(setTT(sampleUser.timetables[0]))
      setLoaded(true)
    }, 500)
  }, [dispatch, user, user.timetables])

  return (
    <>
      <Head>
        <title>uPlanned</title>
      </Head>
      <Navbar />
      <div className="flex space-x-5 w-screen h-screen p-8 bg-slate-50">
        <div className="w-7/12">
          <AddCourses />
        </div>

        <div
          className={`flex flex-col justify-center items-center space-y-2 overflow-hidden p-4 text-center drop-shadow-md rounded-2xl w-10/12 bg-white`}
        >
          {loaded ? (
            <>
              <TTName
                name={activeName}
                setName={(name: string) => dispatch(setName(name))}
              />
              <Timetable courses={activeCourses} />
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </>
  )
}
