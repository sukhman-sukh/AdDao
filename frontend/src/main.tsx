import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { MetaMaskProvider } from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "AdSense",
          url: window.location.href,
        },
      }}
    >
	<ThemeProvider storageKey="vite-ui-theme"><App /></ThemeProvider>
    </MetaMaskProvider>
	</React.StrictMode>
);
