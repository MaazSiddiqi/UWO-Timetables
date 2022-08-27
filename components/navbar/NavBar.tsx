import { useSession, signIn, signOut } from "next-auth/react"
import UserProfile from "./userProfile"

const NavBar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between items-center px-16 py-2 hover:bg-white">
      <h1 className="font-mono text-2xl btn bg-gradient-to-br from-fuchsia-500 to-violet-500 bg-clip-text text-transparent px-2 py-1 rounded-lg select-none">
        uPlanned.
      </h1>
      {/* <UserProfile
        name={"Maaz Siddiqi"}
        img={"https://github.com/MaazSiddiqi.png"}
      /> */}
      {session ? (
        <UserProfile name={session.user?.name} img={session.user?.image} />
      ) : (
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="btn bg-purple-500 px-4 py-1 rounded-full text-slate-100 text-center text-sm font-mono font-light hover:bg-white hover:text-slate-800 active:shadow-inner active:bg-gray-100 transition-all duration-150"
        >
          login
        </button>
      )}
    </nav>
  )
}

export default NavBar
