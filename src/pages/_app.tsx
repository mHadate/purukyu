import type { AppProps } from "next/app";
import { Layout } from "../layout";
import "bulma/css/bulma.min.css";
import "../../styles/globals.css";
import "../../styles/styles.css";
import { AuthProvider } from "../context/AuthContext";
import { init } from "../services/adminApi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  init();
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
