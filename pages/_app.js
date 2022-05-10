import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import userReducer from "@features/user"
import activeTTReducer from "@features/activeTT"
import "../styles/globals.css"

const store = configureStore({
  reducer: {
    user: userReducer,
    activeTT: activeTTReducer,
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
