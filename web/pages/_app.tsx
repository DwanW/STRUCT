import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { apollo } from "../utils/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
