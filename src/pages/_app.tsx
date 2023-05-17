import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EuiProvider colorMode="light">
      <Component {...pageProps} />
    </EuiProvider>
  );
}
