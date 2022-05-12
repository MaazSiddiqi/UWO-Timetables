import { useState } from "react"

interface Query {
  subjectQuery: string | null
  levelQuery: number | null
  termQuery: "A" | "B" | null
  nameQuery: string | null
}

interface QueryCoursesProps {
  runQuery: ({ subjectQuery, levelQuery, termQuery, nameQuery }: Query) => void
}

export default function QueryCourses({ runQuery }: QueryCoursesProps) {
  const [subjectQuery, setSubjectQuery] = useState("")
  const [levelQuery, setLevelQuery] = useState("")
  const [termQuery, setTermQuery] = useState("Term")
  const [nameQuery, setNameQuery] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const query: Query = {
          subjectQuery: subjectQuery === "" ? null : subjectQuery,
          levelQuery: levelQuery === "" ? null : parseInt(levelQuery),
          termQuery:
            ["A", "B"].indexOf(termQuery) > -1
              ? (termQuery as "A" | "B")
              : null,
          nameQuery: nameQuery === "" ? null : nameQuery,
        }
        runQuery(query)
      }}
      className="flex flex-col space-y-5 font-mono"
    >
      <div className="flex space-x-2">
        <input
          type="text"
          className="w-6/12 py-2 px-3 drop-shadow-md rounded-lg outline-0 hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
          value={subjectQuery}
          onChange={(e) => setSubjectQuery(e.target.value.toUpperCase())}
          placeholder="subject"
          maxLength={10}
        />
        <input
          type="text"
          className="w-4/12 py-2 px-3 drop-shadow-md rounded-lg outline-0 hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
          value={levelQuery}
          placeholder="level"
          onChange={(e) =>
            (e.target.value === "" || /^-?\d+$/.test(e.target.value)) &&
            setLevelQuery(e.target.value)
          }
          maxLength={4}
        />
        <select
          className="w-2/12 py-2 px-3 appearance-none drop-shadow-md rounded-lg outline-0 hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
          value={termQuery}
          onChange={(e) => setTermQuery(e.target.value)}
        >
          <option value=""></option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <input
        type="text"
        className="w-full py-2 px-3 drop-shadow-md rounded-lg outline-0 hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
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
