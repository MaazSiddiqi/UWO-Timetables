import { Class, Day, Delivery, Status } from "@prisma/client"

interface CourseClassProps {
  courseClass: Class
  add: () => void
  remove: () => void
  inTT: boolean
}

export default function CourseClass({
  add,
  remove,
  inTT,
  courseClass: {
    campus,
    days,
    delivery,
    location,
    notes,
    status,
    type,
    section,
    startTime,
    endTime,
  },
}: CourseClassProps) {
  const full = status === Status.FULL

  return (
    <button
      onClick={() => {
        if (full) return

        if (inTT) remove()
        else add()
      }}
      className={`relative w-full text-sm rounded-xl shadow-md p-3 px-7 btn cursor-pointer bg-white text-start ${
        !inTT ? "hover:bg-gray-50 active:bg-green-50" : "hover:bg-red-50"
      } `}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between `}
      >
        <div className="text-start">
          <h3 className="font-semibold">
            {type} {section}
          </h3>
          <div className="text-xs">
            <p>
              {location}{" "}
              <span className="text-gray-400">
                {location && "|"} {campus}
              </span>
            </p>
          </div>
        </div>
        <div className="w-/5 space-y-1 select-none">
          <div className="flex justify-between w-full font-mono text-center">
            {delivery !== Delivery.IN_PERSON ? (
              <p className="w-full h-6 text-gray-400 text-center select-none">
                {delivery}
              </p>
            ) : (
              Object.values(Day).map((day, idx) =>
                days.indexOf(day) > -1 ? (
                  <p
                    key={day + idx}
                    className={`px-1 noselect
                        ${idx === 0 && "text-orange-400"}
                        ${idx === 1 && "text-lime-400"}
                        ${idx === 2 && "text-teal-400"}
                        ${idx === 3 && "text-violet-400"}
                        ${idx === 4 && "text-pink-400"} `}
                  >
                    {day}
                  </p>
                ) : (
                  <p
                    key={day + idx}
                    className="px-1 text-gray-200 text-opacity-60"
                  >
                    {day}
                  </p>
                ),
              )
            )}
          </div>
          {delivery === Delivery.IN_PERSON && (
            <div className="flex text-right justify-evenly font-mono text-xs font-light">
              <span>
                {startTime} - {endTime}
              </span>
            </div>
          )}
        </div>
      </div>
      {(full || inTT) && (
        <div
          className={
            "absolute grid place-items-center w-full h-full top-0 left-0 rounded-xl bg-slate-50/70 text-gray-500 active:bg-red-50/50 active:text-red-400"
          }
        >
          <h1 className="font-mono text-lg select-none">
            {inTT ? "in timetable" : "full"}
          </h1>
        </div>
      )}
      {notes && (
        <div
          className={`w-full pt-1 ${
            !full ? "text-red-400" : "text-red-400/50"
          } overflow-x-scroll space-y-[0.125rem]`}
        >
          {notes.map((note, idx) => (
            <p
              key={idx}
              className="w-full overflow-x-scroll flex flex-col text-[70%] [line-height:_13px]"
            >
              {note}
            </p>
          ))}
        </div>
      )}
    </button>
  )
}
