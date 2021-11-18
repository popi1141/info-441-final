import '../styles/globals.css'
import '../utils/firebase.config'
import { AuthProvider } from "../utils/auth";
import AuthStateChanged from "../layouts/AuthStateChanged";
import AppLayout from "../layouts/DefaultLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <AppLayout>
        <AuthStateChanged>
          <Component {...pageProps} />
       </AuthStateChanged>
      </AppLayout>
    </AuthProvider>
  )
}

export default MyApp
