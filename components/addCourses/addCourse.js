import { useEffect, useState, useCallback } from "react"
import calcSubjects from "@/public/CALCULUS.json"
import CourseListItem from "./courseListItem"
import QueryCourses from "./queryCourses"
import ExpandCourse from "./expandCourse"

const MAX_QUERY_SIZE = 5

const savedCourses = calcSubjects["Courses"].slice(0, 30).map((course) => {
  const meta = course["Name"].split("-")
  const name = meta[1].trim()
  const subject = meta[0].split(" ")[0]
  const numCode = meta[0].split(" ")[1]
  const level = parseInt(numCode.slice(0, 4))
  const term = numCode.slice(4)
  const detail = course["Description"]
  const components = course["Components"]

  const data = {
    name,
    subject,
    level,
    term,
    detail,
    components,
  }

  return data
})

export default function AddCourses() {
  const [loaded, setLoaded] = useState(false)

  const [courses, setCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)

  const [prompt, setPrompt] = useState("Popular Courses")

  const query = useCallback(
    ({ nameQuery }) => {
      console.log("Querying courses...")
      const findingName = nameQuery !== ""

      const result = courses.filter((course) => {
        const { name } = course

        if (
          findingName
            ? name.toUpperCase().indexOf(nameQuery.toUpperCase()) > -1
            : true
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
    [courses],
  )

  useEffect(() => {
    setTimeout(() => {
      setCourses(savedCourses)
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
            <p>courses: {courses.length}</p>
            <p>showCourses: {showCourses.length}</p>
          </div>

          <div className="grow p-2 space-y-2 overflow-scroll">
            <p className="font-light">{prompt}</p>
            {loaded ? (
              showCourses.length > 0 &&
              showCourses.map((course, idx) => (
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
