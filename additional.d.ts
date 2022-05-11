interface User {
  name: string
  timetables: Timetable[]
}

interface Timetable {
  name: string
  courses: Course[]
}

interface Course {
  title: string
  component: Component
}

interface CourseData {
  name: string
  subject: string
  level: number
  term: string
  detail: string[]
  components: Component[]
}

interface Component {
  Section: string
  Component: string
  "Class Nbr": string
  Days: string[]
  "Start Time": string
  "End Time": string
  Location: string
  Instructor: string
  Notes: string[]
  Status: string
  Campus: string
  Delivery: string
}
