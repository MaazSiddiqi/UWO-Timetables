import { useEffect, useState, useCallback } from "react"
import calcSubjects from "@public/CALCULUS.json"
import CourseListItem from "./courseListItem"
import QueryCourses from "./queryCourses"
import ExpandCourse from "./expandCourse"
import { CourseData } from "additional"

const MAX_QUERY_SIZE = 5

const savedCourses: CourseData[] = calcSubjects["Courses"]
  .slice(0, 30)
  .map((course) => {
    const meta = course["Name"].split("-")
    const name = meta[1].trim()
    const subject = meta[0].split(" ")[0]
    const numCode = meta[0].split(" ")[1]
    const level = parseInt(numCode.slice(0, 4))
    const term = numCode.slice(4)
    const detail = course["Description"]
    const components = course["Components"]

    const data: CourseData = {
      name,
      subject,
      level,
      term,
      detail,
      components,
    }

    return data
  })

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

  const query = useCallback(
    ({ subjectQuery, levelQuery, termQuery, nameQuery }: Query) => {
      console.log("Querying courses...")
      const findingSubject = subjectQuery !== null
      const findingLevel = levelQuery !== null
      const findingTerm = termQuery !== null
      const findingName = nameQuery !== null

      const result = savedCourses.filter((course: CourseData) => {
        const { subject, level, term, name } = course

        if (
          (findingSubject
            ? subject.toUpperCase().indexOf(subjectQuery.toUpperCase()) > -1
            : true) &&
          (findingLevel
            ? level.toString().indexOf(levelQuery.toString()) > -1
            : true) &&
          (findingTerm
            ? term.toUpperCase() === termQuery.toUpperCase()
            : true) &&
          (findingName
            ? name.toUpperCase().indexOf(nameQuery.toUpperCase()) > -1
            : true)
        )
          return course
      })

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
    setTimeout(() => {
      setShowCourses(savedCourses.slice(0, 5))
      setLoaded(true)
    }, 500)
  }, [])

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl drop-shadow-md overflow-visible py-6 px-4 space-y-4">
      <h1 className="font-semibold text-xl">Add a class</h1>
      {!selectedCourse ? (
        <>
          <QueryCourses runQuery={query} />

          <div className="flex justify-between font-xs text-slate-300">
            <p>courses: {savedCourses.length}</p>
            <p>showCourses: {showCourses.length}</p>
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
