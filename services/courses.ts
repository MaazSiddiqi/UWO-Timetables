import CALCULUSJson from "@public/CALCULUS.json"
import { CourseData } from "additional"

export const savedCourses: CourseData[] = CALCULUSJson["Courses"]
  .slice(0, 30)
  .map((course) => {
    const meta = course["Name"].split("-")
    const name = meta[1].trim()
    const subject = meta[0].split(" ")[0]
    const numCode = meta[0].split(" ")[1]
    const level = parseInt(numCode.slice(0, 4))
    const term = numCode.slice(4)
    const detail = course["Description"]
    const components = course["Components"]

    const data: CourseData = {
      name,
      subject,
      level,
      term,
      detail,
      components,
    }

    return data
  })
