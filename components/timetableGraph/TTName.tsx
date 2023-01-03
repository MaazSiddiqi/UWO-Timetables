import { useState } from "react"

interface TTNameProps {
  name: string
  setName: Function
}

export default function TTName({ name, setName }: TTNameProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState("")

  return (
    <div
      onClick={() => {
        setNewName(name)
        setIsEditing(true)
      }}
      className="w-fit min-w-[1/4] "
    >
      {!isEditing ? (
        <div className="relative btn flex justify-center group items-center space-x-2 py-1 px-3 rounded-xl text-xl font-semibold ">
          <h1>{name}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-3 h-5 w-5 opacity-25 group-hover:opacity-100 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      ) : (
        <form
          onSubmit={() => {
            newName !== "" && setName(newName)
            setNewName("")
            setIsEditing(false)
          }}
          onKeyUp={(e) => {
            if (e.key === "Escape") {
              setNewName("")
              setIsEditing(false)
            }
          }}
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full input py-1 px-3 rounded-xl text-lg font-semibold text-center placeholder:text-sm"
            placeholder="New Name"
            autoFocus
            maxLength={50}
          />
        </form>
      )}
    </div>
  )
}
