import Head from "next/head"
import Timetable from "../components/timetable"
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <>
      <Head>
        <title>uPlanned</title>
      </Head>
      <div className="grid place-items-center w-screen p-16 bg-slate-50">
        <Timetable />
      </div>
    </>
  )
}
