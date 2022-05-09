import { useEffect, useState } from "react"
import calcSubjects from "../public/CALCULUS.json"

export default function AddCourses() {
  const [courses, setCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])
  const [nameQuery, setNameQuery] = useState("")
  const [loaded, setLoaded] = useState(false)

  const query = () => {
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

    console.log("Courses found:", result)

    setShowCourses(result)
  }

  useEffect(() => {
    setTimeout(() => {
      const savedCourses = calcSubjects["Courses"].slice(0, 7).map((course) => {
        const meta = course["Name"].split("-")
        const name = meta[1].trim()
        const subject = meta[0].split(" ")[0]
        const numCode = meta[0].split(" ")[1]
        const level = parseInt(numCode[0] + "000")
        const term = numCode.slice(4)
        const detail = course["Description"]
        const numComponents = course["Components"].length

        const data = {
          name,
          subject,
          level,
          term,
          detail,
          components: numComponents,
        }

        return data
      })

      setCourses(savedCourses)
      setShowCourses(savedCourses.slice(0, 5))
      setLoaded(true)
    }, 500)
  }, [])

  useEffect(() => {
    console.log("nameQuery:", nameQuery)
  }, [nameQuery])

  return (
    <div className="w-full bg-white rounded-lg h-1/3 overflow-hidden p-8 space-y-4">
      <h1 className="font-semibold text-xl">Add a course</h1>
      <div className="flex space-x-5">
        <input
          type="text"
          className="w-1/2 py-2 px-3 drop-shadow-md rounded-lg"
          value={nameQuery}
          onChange={(e) => setNameQuery(e.target.value)}
          placeholder="Course Name"
        />

        <button
          onClick={query}
          className="px-4 py-1 ml-5 rounded-full border-2 hover:shadow-lg hover:scale-105 transition-all duration-150 active:scale-95 "
        >
          query
        </button>
        <div className="font-xs">
          <p>courses: {courses.length}</p>
          <p>showCourses: {showCourses.length}</p>
        </div>
      </div>

      <div className="p-2 space-y-2 overflow-scroll">
        {loaded ? (
          showCourses.length > 0 ? (
            showCourses.map((course, idx) => {
              const { subject, name, level, term } = course

              return (
                <p
                  key={course["name"] + course["level"] + course["term"] + idx}
                >{`${subject} ${level}${term} - ${name}`}</p>
              )
            })
          ) : (
            <p>No courses found!</p>
          )
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  )
}
