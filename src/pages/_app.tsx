import { type AppType } from "next/app";
import { type Session } from "next-auth";
import  Provider  from "./Provider";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider >
      <Component {...pageProps} />
    </Provider>
  );
};

export default api.withTRPC(MyApp);
