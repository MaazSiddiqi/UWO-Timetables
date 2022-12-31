import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "@hooks/redux"
import { Class, ClassInTimetable, Course, Timetable } from "@prisma/client"

type TimetableValue = Timetable & { classes: ClassInTimetable[] }

interface activeTimetableState {
  value: TimetableValue | null
}

const initState: activeTimetableState = {
  value: null,
}
export const activeTimetableSlice = createSlice({
  name: "activeTimetable",
  initialState: initState,
  reducers: {
    setTimetable: (
      state: activeTimetableState,
      action: PayloadAction<TimetableValue>,
    ) => {
      state.value = action.payload
    },
    setName: (state: activeTimetableState, action: PayloadAction<string>) => {
      if (!state.value) return
      state.value.name = action.payload
    },
    addClass: (state: activeTimetableState, action: PayloadAction<Class>) => {
      if (!state.value) return

      const { id } = action.payload

      // Check if course already exists
      // If it does, don't add it
      if (state.value.classes.some((course) => course.classId === id)) return

      // make class in timetable from course
      const classInTimetable: ClassInTimetable = {
        classId: id,
        dateAdded: new Date(),
        timetableId: state.value.id,
      }
      // add class in timetable to classes in timetable
      state.value.classes = [...state.value.classes, classInTimetable]
    },
    removeClass: (
      state: activeTimetableState,
      action: PayloadAction<Class>,
    ) => {
      if (!state.value) return

      const { id } = action.payload

      // remove class from classes in timetable
      const updatedClasses = state.value.classes.filter(
        (course) => course.classId !== id,
      )
      state.value.classes = [...updatedClasses]
    },
  },
})

export const { setTimetable, addClass, removeClass, setName } =
  activeTimetableSlice.actions

export default activeTimetableSlice.reducer

// export const useSearchCourses = () => {
//   const timetable = useAppSelector((store) => store.activeTT.value)
//   if (!timetable) return () => [undefined, false]

//   const search = ({ title, component }: Course) => {
//     const course = courses.find(
//       (course) =>
//         course["title"] === title && course["component"] === component,
//     )
//     const found = course !== undefined

//     return [course, found]
//   }
//   return search
// }
