import type { AppProps } from "next/app";
import { Layout } from "../layout";
import "bulma/css/bulma.min.css";
import "../../styles/globals.css";
import "../../styles/styles.css";
import { init } from "../services/adminApi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  init();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
