import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { store } from "lib/store"
import { Provider } from "react-redux"
import "../styles/globals.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
