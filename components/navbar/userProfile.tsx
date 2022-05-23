import { useState } from "react"
import Image from "next/image"
import { signOut } from "next-auth/react"

interface UserProfileProps {
  name: string | null | undefined
  img: any
}

export default function UserProfile({ name, img }: UserProfileProps) {
  const [expand, setExpand] = useState(false)

  return (
    <div className="relative px-2 py-1">
      <div
        onClick={() => setExpand((state) => !state)}
        className="flex items-center justify-center space-x-2 hover:cursor-pointer btn"
      >
        <h1 className="font-bold text-lg">{name}</h1>
        <div className="relative rounded-full h-6 w-6 overflow-hidden ">
          <Image src={img} alt="User Profile Picture" layout="fill" />
        </div>
      </div>
      {expand && (
        <ul className="absolute top-8 left-0 w-full bg-white drop-shadow-lg rounded-lg z-10 overflow-hidden">
          <li className="list-item">timetables</li>
          <li className="list-item">settings</li>
          <li className="">
            <button
              onClick={() => signOut()}
              className="list-item text-left !text-red-500 w-full h-full transition-all duration-150"
            >
              signout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
