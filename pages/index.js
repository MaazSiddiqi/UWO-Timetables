import Head from "next/head"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { login } from "@features/user"
import { setTT } from "@features/activeTT"
import Timetable from "@/components/timetableGraph/timetable"
import AddCourses from "@/components/addCourses/addCourse"
import calcSubjects from "../public/CALCULUS.json"

const sampleUser = {
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

  const user = useSelector((state) => state.user.value)
  const { name: activeName, courses: activeCourses } = useSelector(
    (state) => state.activeTT.value,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(login(sampleUser))
      dispatch(setTT(sampleUser.timetables[0]))
      setLoaded(true)
    }, 500)
  }, [dispatch, user, user.timetables])

  // const addComponent = (newComponent) => {
  //   console.log(`Adding course: ${newComponent}`)
  //   setActiveTT((prev) => ({
  //     ...prev,
  //     courses: [...prev["courses"], newComponent],
  //   }))
  // }

  return (
    <>
      <Head>
        <title>uPlanned</title>
      </Head>

      <div className="flex space-x-5 w-screen h-screen p-8 bg-slate-50">
        <div className="w-1/3">
          <AddCourses />
        </div>

        <div
          className={`flex flex-col space-y-2 overflow-hidden p-4 text-center drop-shadow-md rounded-2xl w-10/12 bg-white`}
        >
          {loaded ? (
            <>
              <h1 className="text-2xl font-semibold">{activeName}</h1>
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
