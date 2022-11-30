import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ItemsProvider } from "../src/context/items";
import { ModalProvider } from "../src/context/modal";
import { RouteGuard } from "../src/components/RouteGuard";
import { AuthProvider } from "../src/context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteGuard>
        <ModalProvider>
          <ItemsProvider>
            <Component {...pageProps} />
          </ItemsProvider>
        </ModalProvider>
      </RouteGuard>
    </AuthProvider>
  );
}
