import { Course } from "@prisma/client"
import { CourseQuery } from "additional"
import { useCallback, useState } from "react"

type makeQueryArgs = {
  subject: string
  level: string
  term: string
  name: string
}

interface QueryCoursesProps {
  onQuery: (courses: Course[]) => void
}

export default function QueryCourses({ onQuery }: QueryCoursesProps) {
  const [subjectQuery, setSubjectQuery] = useState("")
  const [levelQuery, setLevelQuery] = useState("")
  const [termQuery, setTermQuery] = useState("Term")
  const [nameQuery, setNameQuery] = useState("")

  const runQuery = useCallback(
    async ({ subjectQuery, levelQuery, termQuery, nameQuery }: CourseQuery) => {
      const courses = await fetch("/api/courses/", {
        method: "POST", //TODO: change to GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectQuery,
          levelQuery,
          termQuery,
          nameQuery,
        }),
      })
        .then((res) => res.json())
        .then((res) => res.courses as Course[])
        .catch((err) => {
          console.log(err)
          return [] as Course[]
        })

      return courses
    },
    [],
  )

  const makeQuery = useCallback(
    ({ subject, level, term, name }: makeQueryArgs) => {
      const query: CourseQuery = {
        subjectQuery: subject === "" ? undefined : subject,
        levelQuery: level === "" ? undefined : parseInt(level),
        termQuery:
          ["A", "B"].indexOf(term) > -1 ? (term as "A" | "B") : undefined,
        nameQuery: name === "" ? undefined : name,
      }

      return query
    },
    [],
  )

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        const query = makeQuery({
          subject: subjectQuery,
          level: levelQuery,
          term: termQuery,
          name: nameQuery,
        })

        const courses = await runQuery(query)
        onQuery(courses)
      }}
      className="flex flex-col space-y-2 font-mono"
    >
      <div className="flex space-x-2">
        <input
          type="text"
          className="w-6/12 py-1 px-2 input"
          value={subjectQuery}
          onChange={(e) => setSubjectQuery(e.target.value.toUpperCase())}
          placeholder="subject"
          maxLength={10}
        />
        <input
          type="text"
          className="w-4/12 py-1 px-2 input"
          value={levelQuery}
          placeholder="level"
          onChange={(e) =>
            (e.target.value === "" || /^-?\d+$/.test(e.target.value)) &&
            setLevelQuery(e.target.value)
          }
          maxLength={4}
        />
        <select
          className={`w-2/12 py-1 px-2 ${
            termQuery === "" && "text-gray-400"
          } appearance-none input`}
          value={termQuery}
          onChange={(e) => setTermQuery(e.target.value)}
        >
          <option value="">term</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <input
        type="text"
        className="w-full py-1 px-2 input"
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value.toUpperCase())}
        placeholder="course title"
      />

      <button
        type="submit"
        className="font-mono font-light px-4 py-2 rounded-full border-2 hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
      >
        query
      </button>
    </form>
  )
}
