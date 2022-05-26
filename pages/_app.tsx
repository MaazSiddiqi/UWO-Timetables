import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { store } from "lib/store"
import { Provider } from "react-redux"
import "../styles/globals.css"
import Navbar from "@/components/navbar/NavBar"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
