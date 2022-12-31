import prisma from "@lib/prisma"
import { Course, Prisma } from "@prisma/client"
import { CourseQuery } from "additional"

// import { Course } from "@prisma/client"
// import CALCULUSJson from "@public/CALCULUS.json"
// import { CourseData } from "additional"

// export const savedCourses: CourseData[] = CALCULUSJson["Courses"]
//   .slice(0, 30)
//   .map((course) => {
//     const meta = course["Name"].split("-")
//     const name = meta[1].trim()
//     const subject = meta[0].split(" ")[0]
//     const numCode = meta[0].split(" ")[1]
//     const level = parseInt(numCode.slice(0, 4))
//     const term = numCode.slice(4)
//     const detail = course["Description"]
//     const components = course["Components"]

//     const data: CourseData = {
//       name,
//       subject,
//       level,
//       term,
//       detail,
//       components,
//     }

//     return data
//   })

export const popularCourses = () =>
  prisma.$queryRaw(Prisma.sql`
    SELECT * FROM "Course" ORDER BY RANDOM() LIMIT 5
  `)

export const searchCourses = async ({
  subjectQuery,
  levelQuery,
  termQuery,
  nameQuery,
}: CourseQuery) => {
  const courses = await prisma.course.findMany({})

  const checkCourse = (course: Course) =>
    (!!subjectQuery ? course.subjectCode === subjectQuery : true) &&
    (!!levelQuery ? course.level === levelQuery : true) &&
    (!!termQuery ? course.term === termQuery : true) &&
    (!!nameQuery ? course.title === nameQuery : true)

  const query: Course[] = []

  while (query.length < MAX_QUERY_SIZE && courses.length > 0) {
    const course = courses.pop() as Course
    if (checkCourse(course)) query.push(course)
  }
}
