import { TimetableValue } from "@features/activeTimetable"
import prisma from "@lib/prisma"

export const getTimetableById = async (
  id: string,
): Promise<TimetableValue | null> =>
  prisma.timetable.findUnique({
    where: {
      id,
    },
    include: {
      classes: {
        include: {
          Class: {
            include: {
              Course: true,
            },
          },
        },
      },
    },
  })
