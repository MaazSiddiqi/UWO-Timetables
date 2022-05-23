import { useState } from "react"

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  const [expand, setExpand] = useState(false)

  return (
    <div className="px-2 py-1">
      <div
        onClick={() => setExpand((state) => !state)}
        className="flex items-center justify-center space-x-2 hover:cursor-pointer btn"
      >
        <h1 className="font-bold text-lg">{user.name}</h1>
        <div className="rounded-full h-6 w-6 test"></div>
      </div>
      {expand && (
        <ul className="">
          <li>timetables</li>
          <li>settings</li>
          <li>logout</li>
        </ul>
      )}
    </div>
  )
}
