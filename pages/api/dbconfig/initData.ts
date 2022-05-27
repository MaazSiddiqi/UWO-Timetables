import { Campus, Day, Delivery, Status, Type } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"
import prisma from "@lib/prismaClient"
import subjects from "./subjects"

const initSize = 1
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("\nDatabase init triggered, integrating scrapper data now...")

  for (let i = 0; i < initSize; i++) {
    const data = subjects[i]
    const subject = await prisma.subject.create({
      data: { name: data.Name, code: data.Code },
    })
    console.log(`Created a subject ${data.Code}`)
    console.log(subject)

    const courses = data.Courses
    console.log(`\tFound ${courses ? courses?.length : 0} courses in subject`)
    if (courses)
      for (let i = 0; i < courses.length; i++) {
        const { Name, Description, Components } = courses[i]
        const meta = Name.split("-")
        const name = meta[1].trim()
        const _subject = meta[0].split(" ")[0]
        const numCode = meta[0].split(" ")[1]
        const level = parseInt(numCode.slice(0, 4))
        const term = numCode.slice(4) as string

        const course = await prisma.course.create({
          data: {
            title: name,
            level,
            term,
            detail: Description,
            subjectCode: _subject === data.Code ? _subject : data.Code,
          },
        })

        console.log(`Created course ${name + " " + level}`)
        console.log(course)

        console.log(`\t\tFound ${Components.length} classes in course`)
        if (Components)
          for (let i = 0; i < Components.length; i++) {
            const {
              Section: section,
              Component: type,
              "Class Nbr": classNumber,
              Days: days,
              "Start Time": startTime,
              "End Time": endTime,
              Location: location,
              Instructor: prof,
              Notes: notes,
              Status: _status,
              Campus: _campus,
              Delivery: _delivery,
            } = Components[i]

            const status = _status === "Full" ? "FULL" : "NOT_FULL"
            const campus = getCampus(_campus)
            const delivery = getDelivery(_delivery)

            const component = await prisma.class.create({
              data: {
                section: parseInt(section),
                type: type as Type,
                classNumber: parseInt(classNumber),
                days: days as Day[],
                startTime,
                endTime,
                location,
                prof,
                notes,
                status: status as Status,
                campus: campus as Campus,
                delivery: delivery as Delivery,
                courseId: course.id,
              },
            })

            console.log(`Class assembled`)
            console.log(component)
          }
      }
  }

  return res
    .status(200)
    .send({ message: "Initialized uwo timetable scrapper data" })
}

const getDelivery = (_delivery: string) => {
  switch (_delivery) {
    case "In Person":
      return "IN_PERSON"
    default:
      return _delivery.toUpperCase()
  }
}

const getCampus = (_campus: string) => {
  switch (_campus[0]) {
    case "M":
      return "MAIN"
    case "H":
      return "HURON"
    case "K":
      return "KINGS"
    case "B":
      return "BRESCIA"
    default:
      break
  }
}
