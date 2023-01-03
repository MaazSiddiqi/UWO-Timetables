import DevTools from "@components/DevTools"
import SearchClasses from "@components/addCourses/searchCourses"
import TimetableDisplay from "@components/timetableGraph/timetable"
import { useActiveTT } from "@hooks/activeTT"
import {
  Class,
  ClassInTimetable,
  Course,
  Profile,
  Timetable,
} from "@prisma/client"
import { getTimetableById } from "@services/timetable"
import { getSession } from "next-auth/react"
import { useEffect } from "react"

const Edit: React.FC<
  Profile & {
    timetable: Timetable & {
      classes: (ClassInTimetable & {
        Class: Class & {
          Course: Course
        }
      })[]
    }
  }
> = ({ timetable }) => {
  const { setTimetable, activeTT, addClass, removeClass, setName } =
    useActiveTT()

  useEffect(() => {
    setTimetable(timetable)
  }, [setTimetable, timetable])

  if (!activeTT) return null

  return (
    <>
      <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 w-screen min-h-[80vh] lg:max-h-[90vh] p-8 bg-slate-50">
        <div className="w-full lg:w-7/12">
          <SearchClasses
            onAdd={async (courseClass) => await addClass(courseClass)}
            onRemove={async (courseClass) => await removeClass(courseClass)}
          />
        </div>

        <div
          className={`flex flex-col justify-center items-center space-y-2 overflow-hidden p-4 text-center drop-shadow-md rounded-2xl w-full lg:w-10/12 bg-white`}
        >
          <TimetableDisplay
            timetable={activeTT}
            setName={async (name) => await setName(name)}
            onRemove={async (courseClass) => await removeClass(courseClass)}
          />
        </div>
      </div>
      <DevTools>
        <pre>{JSON.stringify(activeTT, null, 2)}</pre>
      </DevTools>
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

  if (!session.profile) {
    return {
      redirect: {
        destination: "dashboard/setup",
        permanent: true,
      },
    }
  }

  const timetableId = context.params.timetableId
  const timetable = await getTimetableById(timetableId)

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
