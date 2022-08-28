import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import { User } from "@prisma/client"
import Router from "next/router"
import prisma from "@lib/prisma"

const Setup: React.FC<{ user: User }> = ({ user }) => {
  const [username, setUsername] = useState("")

  const validateFields = () => {
    const formValid = username !== "" // implement username validation here
    return formValid
  }

  const createProfile = async () => {
    const profile = await fetch(`/api/profile`, {
      method: "POST",
      body: JSON.stringify({ username, email: user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => Router.replace("/dashboard"))
      .catch((err) => console.log(err))
  }

  return (
    <div className="grid place-items-center grow">
      <div className="p-16 shadow-lg rounded-xl space-y-6 text-left">
        <h1 className="text-2xl font-bold">Welcome! Lets get you setup...</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const valid = validateFields()
            valid ? createProfile() : console.log("Error, invalid fields")
          }}
          className="flex flex-col space-y-4"
        >
          <div className="space-y-1">
            <label htmlFor="username" className="p-1 text-indigo-600">
              Username
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

export default Setup

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }
  const user = session?.user
  const email = user.email as string
  const profile = await prisma.profile.findUnique({
    where: {
      email,
    },
  })

  if (profile) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}
