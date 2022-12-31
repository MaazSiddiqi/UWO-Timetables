import { Profile } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    profile: Profile | null
  }
}

export type CourseQuery = {
  subjectQuery: string | null
  levelQuery: number | null
  termQuery: "A" | "B" | null
  nameQuery: string | null
}

// interface User {
//   name: string
//   timetables: Timetable[]
// }

// interface Timetable {
//   name: string
//   courses: Course[]
// }

// interface Course {
//   title: string
//   component: Component
// }

// interface CourseData {
//   name: string
//   subject: string
//   level: number
//   term: string
//   detail: string[]
//   components: Component[]
// }

// interface Component {
//   Section: string
//   Component: string
//   "Class Nbr": string
//   Days: string[]
//   "Start Time": string
//   "End Time": string
//   Location: string
//   Instructor: string
//   Notes: string[]
//   Status: string
//   Campus: string
//   Delivery: string
// }
