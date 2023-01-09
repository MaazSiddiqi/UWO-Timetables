import { ReactNode, useEffect, useState } from "react"

const DevTools: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("keypress", (event) => {
      if (event.key === "\\") setOpen(true)
      if (event.key === "|") setOpen(false)
    })
  }, [])

  if (!open)
    return (
      <button
        className="btn rounded-md fixed bottom-4 left-4 w-fit text-center select-none px-2 py-1  bg-slate-300 text-slate-600"
        onClick={() => setOpen(true)}
      >
        Dev Tools
      </button>
    )

  return (
    <div className="fixed bottom-0 rounded-md left-0 w-screen  p-6 space-y-2 bg-slate-200/90 backdrop-blur-md text-slate-700">
      <button
        className="absolute right-6 btn rounded-lg text-center px-2 py-1 bg-red-300"
        onClick={() => setOpen(false)}
      >
        close
      </button>
      <h1 className="font-mono font-bold">Dev tools</h1>
      <div className="overflow-y-scroll max-h-[40vh]">{children}</div>
    </div>
  )
}

const DevItem: React.FC<{ name: string; value: any }> = ({ name, value }) => {
  return (
    <pre>
      {name}: <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  )
}

export default DevTools
