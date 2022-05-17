import type { AppProps } from "next/app";
import { Layout } from "../layout";
import "bulma/css/bulma.min.css";
import "../../styles/globals.css";
import "../../styles/styles.css";
import { AuthProvider } from "../context/AuthContext";
import { AdminAuthProvider } from "../context/AdminAuthContext";
import { useRouter } from "next/router";
import AdminLayout from "./admin/layout";
import { init } from "../services/adminApi";

const MyApp = ({ Component, pageProps }: AppProps) => {
  init()
  const router = useRouter();
  const pathname = router.pathname;
  return pathname.match(/^\/admin/) ? (
    <AdminAuthProvider>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </AdminAuthProvider>
  ) : (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
