import { Course } from "@prisma/client"
import { CourseData, CourseQuery } from "additional"
import { useCallback, useEffect, useState } from "react"
import CourseListItem from "./courseListItem"
import ExpandCourse from "./expandCourse"
import QueryCourses from "./queryCourses"

const MAX_QUERY_SIZE = 5

export default function AddCourses() {
  const [loaded, setLoaded] = useState(false)

  const [showCourses, setShowCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const [prompt, setPrompt] = useState("Popular Courses")

  useEffect(() => {
    const getPopularCourses = async () => {
      const courses = await fetch("/api/courses/popular")
        .then((res) => res.json())
        .then((res) => res.courses as Course[])
        .catch((err) => {
          console.log(err)
          return [] as Course[]
        })

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
          <QueryCourses
            onQuery={(courses) => {
              setShowCourses(courses)
              setPrompt(
                `Found ${courses.length} course${
                  courses.length == 1 ? "" : "s"
                }`,
              )
            }}
          />

          <div className="flex justify-between font-xs text-slate-300">
            {/* <p>courses: {savedCourses.length}</p>
            <p>showCourses: {showCourses.length}</p> */}
          </div>

          <div className="grow p-2 space-y-2 overflow-scroll">
            <p className="font-light font-mono">{prompt}</p>
            {loaded ? (
              showCourses.map((course: Course, idx) => (
                <CourseListItem
                  key={course.id + idx}
                  course={course}
                  onSelect={setSelectedCourse}
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
