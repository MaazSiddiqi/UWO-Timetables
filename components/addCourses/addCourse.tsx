import { useEffect, useState, useCallback } from "react"
import CourseListItem from "./courseListItem"
import QueryCourses from "./queryCourses"
import ExpandCourse from "./expandCourse"
import { CourseData } from "additional"

const MAX_QUERY_SIZE = 5

interface Query {
  subjectQuery: string | null
  levelQuery: number | null
  termQuery: "A" | "B" | null
  nameQuery: string | null
}

export default function AddCourses() {
  const [loaded, setLoaded] = useState(false)

  const [showCourses, setShowCourses] = useState<CourseData[]>([])
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null)

  const [prompt, setPrompt] = useState("Popular Courses")

  const query = useCallback<(args: Query) => void>(
    ({ subjectQuery, levelQuery, termQuery, nameQuery }) => {
      console.log("Querying courses...")
      const checkSubject = subjectQuery !== null
      const checkLevel = levelQuery !== null
      const checkTerm = termQuery !== null
      const checkName = nameQuery !== null

      const result = savedCourses.filter(
        ({ subject, level, term, name }: CourseData) =>
          (checkSubject
            ? subject.toUpperCase().indexOf(subjectQuery.toUpperCase()) > -1
            : true) &&
          (checkLevel
            ? level.toString().indexOf(levelQuery.toString()) > -1
            : true) &&
          (checkTerm ? term.toUpperCase() === termQuery.toUpperCase() : true) &&
          (checkName
            ? name.toUpperCase().indexOf(nameQuery.toUpperCase()) > -1
            : true),
      )

      console.log("Courses found:", result.length)

      if (result.length > MAX_QUERY_SIZE) {
        setShowCourses([])
        setPrompt(
          `Query too large (${result.length}), try being more specific...`,
        )
        return
      }

      setShowCourses(result)
      setPrompt(`Found ${result.length} course${result.length == 1 ? "" : "s"}`)
    },
    [],
  )

  useEffect(() => {
    const getPopularCourses = async () => {
      const { courses } = await fetch("/api/courses/popular").then((res) =>
        res.json(),
      )
      setShowCourses(courses)
      setLoaded(true)
    }

    getPopularCourses()
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl drop-shadow-md overflow-visible py-6 px-4 space-y-4">
      <h1 className="font-semibold text-xl">Add a class</h1>
      {!selectedCourse ? (
        <>
          <QueryCourses runQuery={query} />

          <div className="flex justify-between font-xs text-slate-300">
            {/* <p>courses: {savedCourses.length}</p>
            <p>showCourses: {showCourses.length}</p> */}
          </div>

          <div className="grow p-2 space-y-2 overflow-scroll">
            <p className="font-light font-mono">{prompt}</p>
            {loaded ? (
              showCourses.length > 0 &&
              showCourses.map((course: CourseData, idx: number) => (
                <CourseListItem
                  key={course["name"] + course["level"] + course["term"] + idx}
                  course={course}
                  select={setSelectedCourse}
                />
              ))
            ) : (
              <>Loading...</>
            )}
          </div>
        </>
      ) : (
        <ExpandCourse
          course={selectedCourse}
          deselect={() => setSelectedCourse(null)}
        />
      )}
    </div>
  )
}
