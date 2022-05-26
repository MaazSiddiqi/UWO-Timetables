import { useState } from "react"
import { getSession } from "next-auth/react"

export default function Setup() {
  const [username, setUsername] = useState("")

  const validateFields = () => {
    const formValid = username !== ""
    return formValid
  }

  return (
    <div className="grid place-items-center grow">
      <div className="p-16 shadow-lg rounded-xl space-y-6 text-left">
        <h1 className="text-2xl font-bold">Welcome! Lets get you setup...</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const valid = validateFields()
            valid ? true : console.log("Error, invalid fields")
          }}
          className="flex flex-col space-y-4"
        >
          <div>
            <label htmlFor="username" className="p-1 text-indigo-600">
              What should we call you?
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="w-full py-2 px-3 drop-shadow-md rounded-lg outline-0 text-gray-500 font-mono hover:drop-shadow-lg hover:scale-[1.025] focus:scale-[1.025] focus:drop-shadow-lg active:scale-[1.025] active:drop-shadow-lg focus-within:scale-[1.025] focus-within:drop-shadow-lg transition-transform duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full btn bg-purple-500 px-4 py-1 rounded-full text-slate-100 text-center text-sm font-mono font-light hover:bg-white hover:text-slate-800 active:shadow-inner active:bg-gray-100 transition-all duration-150"
          >
            next
          </button>
        </form>
      </div>
    </div>
  )
}
