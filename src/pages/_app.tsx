import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import store from "@/store/store";
import "@/styles/globals.css";

const App = ({ Component, pageProps: { ...pageProps } }: AppProps<{}>) => {
  return (
    <Provider store={store}>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </Provider>
  );
};
export default App;
