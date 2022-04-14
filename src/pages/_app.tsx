import type { AppProps } from "next/app";
import { Layout } from "../layout";
import "../../styles/globals.css";
import "../../styles/styles.css";
import { AuthProvider } from "../context/AuthContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
