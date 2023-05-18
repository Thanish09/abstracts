import type { AppProps } from "next/app";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <EuiProvider colorMode="light">
        <Component {...pageProps} />
      </EuiProvider>
    </QueryClientProvider>
  );
}
