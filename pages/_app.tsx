import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ItemsProvider } from "context/items";
import { ModalProvider } from "context/modal";
import { RouteGuard } from "components/RouteGuard";
import { AuthProvider } from "context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RouteGuard>
        <ModalProvider>
          <ItemsProvider>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </ItemsProvider>
        </ModalProvider>
      </RouteGuard>
    </AuthProvider>
  );
}
