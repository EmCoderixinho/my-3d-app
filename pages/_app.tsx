import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  //wrapping the whole application with AuthContextProvider sso we have the AuthContext globally in out app
  //we use layout so every page has the same look

  return (
    <AuthContextProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;