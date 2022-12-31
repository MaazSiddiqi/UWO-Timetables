// import { getSession } from "next-auth/react"

import { getSession } from "next-auth/react"
import Link from "next/link"
import { GetServerSidePropsContext } from "next/types"

// TODO: Make Homepage

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to uPlanned!</h1>
      <Link href={"/dasboard"}>
        <a>Get Started!</a>
      </Link>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session?.user)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    }

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Home
