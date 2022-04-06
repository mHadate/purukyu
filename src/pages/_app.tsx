import type { AppProps } from "next/app";
import { Layout } from "../layout";
import "../../styles/globals.css";
import "../../styles/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
