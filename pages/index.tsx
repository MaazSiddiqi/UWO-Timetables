import { getSession } from "next-auth/react"

// TODO: Upload scrapper data to prisma
// TODO: Create apis to update timetable

const Home: React.FC = () => {
  return <></>
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  console.log("session:", session)

  if (session)
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
