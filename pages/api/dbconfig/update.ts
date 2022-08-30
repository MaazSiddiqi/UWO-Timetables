import { Campus, Day, Delivery, Status, Subject, Type } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next/types"
import prisma from "@lib/prisma"
import subjects from "@public/subjects.json"

const SUBJECTS_COUNT = 2

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("\nDatabase init triggered, integrating scrapper data now...")
  console.time("Db updated time")

  const data: any = subjects

  for (let i = 0; i < data.length; i++) {
    const { Name: name, Code: code, Courses: coursesData } = data[i]
    console.log("Uploading subject: ", name)

    const subject = await prisma.subject.upsert({
      create: {
        name: name,
        code: code,
      },
      update: {
        name: name,
        code: code,
      },
      where: {
        code: code,
      },
    })

    console.log(`Updated subject, ${subject.code}: ${subject.name}`)

    console.log(
      `\tFound ${coursesData ? coursesData?.length : "no"} courses in ${code}`,
    )

    if (!coursesData) continue

    for (let i = 0; i < coursesData.length; i++) {
      const { Name, Description, Components } = coursesData[i]
      const meta = Name.split("-")
      const name = meta[1].trim()
      const _subject = meta[0].split(" ")[0]
      const numCode = meta[0].split(" ")[1]
      const level = parseInt(numCode.slice(0, 4))
      const term = numCode.slice(4) as string

      console.log(`\tUploading course: ${name}`)

      const course = await prisma.course.upsert({
        create: {
          title: name,
          level,
          term,
          detail: Description,
          subjectCode: _subject,
        },
        update: {
          title: name,
          level,
          term,
          detail: Description,
          subjectCode: _subject,
        },
        where: {
          title: name,
        },
      })

      console.log(`\tUpdated course ${course.title}`)

      console.log(`\t\tFound ${Components.length} classes in course`)

      if (!Components) continue

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

        console.log({ _status, _campus, _delivery })
        const status = _status === "Full" ? "FULL" : "NOT_FULL"
        const campus = getCampus(_campus)
        const delivery = getDelivery(_delivery)
        console.log({ status, campus, delivery })

        const courseClass = await prisma.class.upsert({
          create: {
            courseId: course.id,
            section: parseInt(section),
            type: type as Type,
            classNumber: parseInt(classNumber),
            days: days as Day[],
            startTime,
            endTime,
            location,
            prof,
            notes,
            status: status,
            campus: campus,
            delivery: delivery,
          },
          update: {
            courseId: course.id,
            section: parseInt(section),
            type: type as Type,
            classNumber: parseInt(classNumber),
            days: days as Day[],
            startTime,
            endTime,
            location,
            prof,
            notes,
            status: status,
            campus: campus,
            delivery: delivery,
          },
          where: {
            classNumber: parseInt(classNumber),
          },
        })
      }
    }
  }

  console.timeEnd("Db updated time")
  return res
    .status(200)
    .send({ message: "Updated uwo timetable scrapper data" })
}

const getDelivery = (_delivery: string): Delivery => {
  switch (_delivery) {
    case "In Person":
      return "IN_PERSON"
    case "Distance Studies/Online":
      return "ONLINE"
    default:
      return _delivery.toUpperCase() as Delivery
  }
}

const getCampus = (_campus: string): Campus => {
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
      return "MAIN"
  }
}
