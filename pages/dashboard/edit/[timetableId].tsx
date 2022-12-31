import AddCourses from "@components/addCourses/addCourse"
import TTName from "@components/timetableGraph/TTName"
import TimetableDisplay from "@components/timetableGraph/timetable"
import { setName } from "@features/activeTimetable"
import prisma from "@lib/prisma"
import { ClassInTimetable, Profile, Timetable } from "@prisma/client"
import { User } from "additional"
import { getSession } from "next-auth/react"
import calcSubjects from "../../../public/CALCULUS.json"

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

const Edit: React.FC<
  Profile & {
    timetable: Timetable & {
      classes: ClassInTimetable[]
    }
  }
> = ({ timetable }) => {
  // const user = useAppSelector((state) => state.user.value)
  // const { name: activeName, courses: activeCourses } = useAppSelector(
  //   (state) => state.activeTT.value,
  // )
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(login(sampleUser))
  //     dispatch(setTimetable(sampleUser.timetables[0]))
  //     setLoaded(true)
  //   }, 500)
  // }, [dispatch, user, user.timetables])

  return (
    <>
      <div className="flex space-x-5 w-screen h-screen p-8 bg-slate-50">
        <div className="w-7/12">
          <AddCourses />
        </div>

        <div
          className={`flex flex-col justify-center items-center space-y-2 overflow-hidden p-4 text-center drop-shadow-md rounded-2xl w-10/12 bg-white`}
        >
          <TTName
            name={timetable.name}
            setName={(name: string) => dispatch(setName(name))}
          />
          <TimetableDisplay courses={timetable.classes} />
        </div>
      </div>
    </>
  )
}

export default Edit

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

  console.log({ session })

  if (!session.profile) {
    return {
      redirect: {
        destination: "dashboard/setup",
        permanent: true,
      },
    }
  }

  const timetableId = context.params.timetableId

  const timetable = await prisma.timetable.findUnique({
    where: { id: timetableId },
    include: {
      classes: true,
    },
  })

  console.log({ timetable })

  if (!timetable) {
    return {
      statusCode: 404,
      props: {},
    }
  }

  return {
    props: {
      ...session.profile,
      timetable,
    },
  }
}
