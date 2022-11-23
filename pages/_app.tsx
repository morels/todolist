import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ItemsProvider } from "../src/context/items";
import { ModalProvider } from "../src/context/modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <ItemsProvider>
        <Component {...pageProps} />
      </ItemsProvider>
    </ModalProvider>
  );
}
