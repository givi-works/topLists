import { ToastContainer } from 'react-toastify'
import { SessionProvider } from "next-auth/react"

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';



export default function MyApp({ Component, pageProps: { session, ...pageProps}, temp}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SessionProvider>
  )
}