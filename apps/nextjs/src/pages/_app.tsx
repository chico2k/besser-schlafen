import "../styles/globals.css";
import type { AppType } from "next/app";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(MyApp);
