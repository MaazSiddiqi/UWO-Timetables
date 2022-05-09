import { useState } from "react"

export default function QueryCourses({ runQuery }) {
  const [nameQuery, setNameQuery] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        runQuery({ nameQuery })
      }}
      className="flex flex-col space-y-5"
    >
      <input
        type="text"
        className="w-full py-2 px-3 drop-shadow-md rounded-lg outline-0"
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
        placeholder="Course Name"
      />

      <button
        type="submit"
        className="font-light px-4 py-2 rounded-full border-2 hover:shadow-lg hover:scale-105 transition-all duration-150 active:scale-95 "
      >
        QUERY
      </button>
    </form>
  )
}
